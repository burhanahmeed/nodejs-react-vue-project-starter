import { ModelStatic, Op } from 'sequelize';
import db from '../models';

export default class RoleService {
  private role: ModelStatic<any>;

  constructor() {
    this.role = db.Role;
  }

  public async listAll() {
    return this.role.findAll();
  }
}

export const Roles = new RoleService();
