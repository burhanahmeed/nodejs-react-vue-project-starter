import { NextFunction, Request, Response } from 'express';
import BaseController from './BaseController';
import { Users } from '../services/UserService';
import bcrypt from 'bcrypt';
import Validator from 'validatorjs';
import { ROLES, ROLES_MAP } from '../constants/roles';
import { IFindOptions } from '../types/base';

export default class UserController extends BaseController {
  public static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id }: any = req.params;
      const resp = await Users.getById(id);
      if (!resp) {
        super.throwNotFoundError('get_user', 'user was not found');
      }

      res.json({
        status: 'success',
        data: resp,
      });
    } catch (error: any) {
      next(error);
    }
  }

  public static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, size }: any = req.query;
      const opts = UserController.getOpts(req);
      const pagination = super.buildPaginationOpts(Number(page), Number(size))
      const resp = await Users.listWithPagination({ ...opts, ...pagination });

      const result = UserController.getPagingData(resp, page || 1, size || 25);

      res.json({
        status: 'success',
        ...result,
      });
    } catch (error: any) {
      next(error);
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      UserController.validateForm(req.body, {
        name: 'required',
        email: 'required',
        password: 'required|min:4',
        role_id: 'required',
      });

      if (!ROLES_MAP[`${req.body.role_id}`]) throw super.throwBadRequest('create_user', 'Invalid role id');

      UserController.checkAuthorization(ROLES_MAP[`${req.body.role_id}`], res.locals.role, [ROLES.admin.name]);

      const user = await Users.getByEmail(req.body.email.toLowerCase());
      if (user) {
        throw super.throwBadRequest('sign_up', 'email is already used');
      }

      const resp = await Users.create({
        ...req.body,
        email: req.body.email.toLowerCase(),
        password: bcrypt.hashSync(req.body.password, 10),
      });

      const response = resp.toJSON();
      delete response.password;

      res.json({
        status: 'success',
        data: response,
      });
    } catch (error: any) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const body = { ...req.body };
      delete body.password;

      if (!ROLES_MAP[`${req.body.role_id}`]) throw super.throwBadRequest('update_user', 'Invalid role id');

      const user = await Users.getById(Number(req.params.id));
      if (!user) {
        throw super.throwBadRequest('delete_user', 'user was not found!');
      }

      UserController.checkAuthorization(ROLES_MAP[`${req.body.role_id}`], res.locals.role);

      const resp = await Users.update(Number(req.params.id), body);

      res.json({
        status: 'success',
        data: resp,
      });
    } catch (error: any) {
      next(error);
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await Users.getById(Number(req.params.id));
      if (!user) {
        throw super.throwBadRequest('delete_user', 'user was not found!');
      }

      UserController.checkAuthorization(user.role.name, res.locals.role);

      await Users.delete(Number(req.params.id));

      res.json({
        status: 'success',
        message: 'User was deleted.'
      });
    } catch (error) {
      next(error);
    }
  }

  public static async me(_req: Request, res: Response, next: NextFunction) {
    try {
      const resp = await Users.getById(Number(res.locals.user.id));

      res.json({
        status: 'success',
        data: resp,
      });
    } catch (error: any) {
      next(error);
    }
  }

  public static async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const resp = await Users.update(Number(req.params.id), {
        password: bcrypt.hashSync(req.body.password, 10),
      });

      res.json({
        status: 'success',
        data: resp,
      });
    } catch (error: any) {
      next(error);
    }
  }

  private static checkAuthorization(targetedUserRole: string, authRole: string, disallowedRole?: string[]) {
    const roles = disallowedRole || [ROLES.admin.name, ROLES.editor.name];

    if (authRole === ROLES.admin.name) {
      return true;
    } else if (authRole === ROLES.editor.name && roles.includes(`${targetedUserRole}`)) {
      throw super.throwNotAllowed('user_auth', 'you are not allowed');
    }
  }

  private static validateForm(data: any, rules: any) {
    const validation = new Validator(data, rules);
    if (validation.fails()) {
      super.throwFormValidationError('auth_validation', validation.errors.errors);
    }

    return true;
  }

  static getOpts(req: Request): IFindOptions {
    const { search }: any = req.query;

    return {
      filters: { search }
    }
  }
}
