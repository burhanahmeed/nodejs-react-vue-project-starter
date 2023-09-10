import { NextFunction, Request, Response } from 'express';
import BaseController from './BaseController';
import { Roles } from '../services/RoleService';

export default class RolesController extends BaseController {
  public static async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const resp = await Roles.listAll();

      res.json({
        status: 'success',
        data: resp,
      });
    } catch (error: any) {
      next(error);
    }
  }
}
