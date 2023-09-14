import { ModelStatic, Op } from 'sequelize';
import db from '../models';
import { IFindOptions } from '../types/base';

export default class FileService {
  private file: ModelStatic<any>;

  constructor() {
    this.file = db.User;
  }

  store() {

  }

  updateById() {

  }

  deleteById() {

  }

  listAll() {
    
  }
}

export const File = new FileService();
