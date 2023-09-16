import { ModelStatic, Op } from 'sequelize';
import db from '../models';
import { IFindOptions } from '../types/base';
import ApiError from '../utils/apiError'

export default class FileService {
  private file: ModelStatic<any>;

  constructor() {
    this.file = db.File;
  }

  store(payload: any) {
    return this.file.create(payload);
  }

  async updateByIdIfExist(id: number, payload: any) {
    try {
      const file = this.getById(id);
      if (!file) {
        throw new ApiError(404, 'not_found', 'file_service', 'file you requested does not exist');
      }

      return this.file.update(payload, { where: { id } });
    } catch (error) {
      throw error;
    }
  }

  getById(id: number) {
    return this.file.findOne({ where: { id } });
  }

  deleteByIdIfExist(id: number) {
    try {
      const file = this.getById(id);
      if (!file) {
        throw new ApiError(404, 'not_found', 'delete_file_service', 'file you requested does not exist');
      }

      return this.file.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  listAll(opts: IFindOptions) {
    return this.file.findAll({ where: { email: { [Op.like]: `%${opts?.filters?.search}%` } } });
  }
}

export const File = new FileService();
