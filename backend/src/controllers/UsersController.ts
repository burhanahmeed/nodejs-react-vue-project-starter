import { NextFunction, Request, Response } from 'express';
import BaseController from './BaseController';
import { Users } from '../services/UserService';
import bcrypt from 'bcrypt';
import Validator from 'validatorjs';
import { ROLES } from '../constants/roles';

export default class UserController extends BaseController {
  public static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id }: any = req.params;
      const resp = await Users.getById(id);

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
      const { page, size, search }: any = req.query;
      const resp = await Users.listWithPagination({
        search,
        page,
        size,
      });

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
        username: 'required',
        password: 'required|min:4',
        role_id: 'required',
      });

      const resp = await Users.create({
        ...req.body,
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

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const body = { ...req.body };
      delete body.password;

      const user = await Users.getById(Number(req.params.id));
      if (!user) {
        throw super.throwBadRequest('delete_user', 'user was not found!');
      }

      UserController.checkAuthorization(user, res.locals.role);

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

      UserController.checkAuthorization(user, res.locals.role);

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

  private static checkAuthorization(targetedUser: any, authRole: string) {
    if (authRole === ROLES.admin.name) {
      return true;
    } else if (authRole === ROLES.editor.name && [ROLES.admin.name, ROLES.editor.name].includes(`${targetedUser.role.name}`)) {
      throw super.throwNotAllowed('user_auth', 'you are not allowed');
    }
  }

  private static validateForm(data: any, rules: any) {
    const validation = new Validator(data, rules);
    if (validation.fails()) {
      throw validation.errors;
    }

    return true;
  }
}
