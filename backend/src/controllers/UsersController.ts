import { NextFunction, Request, Response } from 'express';
import BaseController from './BaseController';
import { Users } from '../services/UserService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Validator from 'validatorjs';
import { JWT_KEY } from '../constants/auth';

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
      console.log(res.locals.role);
      
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

      const resp = await Users.update(Number(req.params.id), body);

      res.json({
        status: 'success',
        data: resp,
      });
    } catch (error: any) {
      next(error);
    }
  }

  public static async delete(req: Request, res: Response) {}

  public static async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const resp = await Users.getByEmailOrUsername(req.body.username, {
        withPassword: true,
      });

      if (!resp) {
        throw new Error('Username, email, atau password salah');
      }

      const isSuccess = bcrypt.compareSync(req.body.password, resp.password);

      if (!isSuccess) {
        throw new Error('Username, email, atau password salah');
      }

      const data = {
        id: resp.id,
        name: resp.name,
        username: resp.username,
        email: resp.email,
        role_id: resp.role_id,
        role_name: resp.role.name,
      };

      const token = jwt.sign(data, JWT_KEY, { expiresIn: 9999999999 });

      res.json({
        status: 'success',
        data: {
          token,
          ...data,
        },
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

  private static validateForm(data: any, rules: any) {
    const validation = new Validator(data, rules);
    if (validation.fails()) {
      throw validation.errors;
    }

    return true;
  }
}
