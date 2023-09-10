import { ModelStatic, Op } from 'sequelize';
import db from '../models';

export default class UserService {
  private user: ModelStatic<any>;

  constructor() {
    this.user = db.User;
  }

  public async getById(id: number) {
    return this.user.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
      include: ['role'],
    });
  }

  public async getByEmailOrUsername(
    value: string,
    opts: { withPassword?: boolean } = {}
  ) {
    const options: any = {
      where: {
        [Op.or]: [{ email: value }, { username: value }],
      },
      include: ['role'],
      attibutes: { exclude: ['password'] },
    };

    if (opts.withPassword) {
      delete options.attibutes;
    }

    return this.user.findOne(options);
  }

  public listWithPagination(opts: { search?: string; page?: number; size?: number }) {
    const where = {};
    if (opts.search) {
      Object.assign(where, {
        [Op.or]: [
          { email: { [Op.like]: `%${opts.search}%` } },
          { username: { [Op.like]: `%${opts.search}%` } },
          { name: { [Op.like]: `%${opts.search}%` } },
        ],
      });
    }

    return this.user.findAndCountAll({
      where,
      limit: opts.size,
      offset: opts.page && opts.size ? (opts.page - 1) * opts.size : 0,
      include: ['role'],
    });
  }

  public create(payload: any) {
    return this.user.create(payload);
  }

  public update(id: number, payload: any) {
    return this.user.update(payload, {
      where: { id },
    });
  }

  public delete() {}
}

export const Users = new UserService();
