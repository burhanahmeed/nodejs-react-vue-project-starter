import fs from  'fs'
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
      const file: any = await this.getById(id);
      if (!file) {
        throw new ApiError(404, 'not_found', 'file_service', 'file you requested does not exist');
      }

      const filePath = `public/uploads/${file.image_path}`;
      
      // Check if the file to be replaced exists
      if (fs.existsSync(filePath)) {
        // Delete the old file
        fs.unlinkSync(filePath);
      }

      return this.file.update(payload, { where: { id } });
    } catch (error) {
      throw error;
    }
  }

  getById(id: number) {
    return this.file.findOne({ where: { id } });
  }

  async deleteByIdIfExist(id: number) {
    try {
      const file = await this.getById(id);
      if (!file) {
        throw new ApiError(404, 'not_found', 'delete_file_service', 'file you requested does not exist');
      }

      const filePath = `public/uploads/${file.image_path}`;
      
      // Check if the file to be replaced exists
      if (fs.existsSync(filePath)) {
        // Delete the old file
        fs.unlinkSync(filePath);
      }

      return this.file.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  listAll(opts: IFindOptions) {
    const where = {};
    if (opts?.filters?.search) {
      Object.assign(where, { name: { [Op.like]: `%${opts?.filters?.search}%` } });
    }

    return this.file.findAll({ where });
  }
}

export const File = new FileService();
