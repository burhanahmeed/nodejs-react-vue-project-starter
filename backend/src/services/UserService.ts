import { ModelStatic, Op } from 'sequelize';
import db from '../models';
import { IFindOptions } from '../types/base';

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

  public async getByEmail(
    value: string,
    opts: { withPassword?: boolean } = {}
  ) {
    const options: any = {
      where: {
        [Op.or]: [{ email: value }],
      },
      include: ['role'],
      attributes: { exclude: ['password'] },
    };

    if (opts.withPassword) {
      delete options.attributes;
    }

    return this.user.findOne(options);
  }

  public listWithPagination(opts: IFindOptions) {
    const where = {};
    if (opts?.filters?.search) {
      Object.assign(where, {
        [Op.or]: [
          { email: { [Op.like]: `%${opts?.filters?.search}%` } },
          { name: { [Op.like]: `%${opts?.filters?.search}%` } },
        ],
      });
    }

    return this.user.findAndCountAll({
      where,
      limit: opts.limit,
      offset: opts.offset,
      include: ['role'],
      attributes: { exclude: ['password'] },
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

  public delete(id: number) {
    return this.user.destroy({
      where: { id }
    });
  }
}

export const Users = new UserService();
