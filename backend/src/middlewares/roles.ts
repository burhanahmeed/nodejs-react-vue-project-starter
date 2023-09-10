import { Request, Response, NextFunction } from 'express'
import { isAdmin } from '../helpers/users';
import ApiError from '../utils/apiError';
import { ERROR_TYPE } from '../constants/auth';

export const checkAdmin = (_req: Request, res: Response, next: NextFunction) => {
  if (!isAdmin(res.locals.role)) {
    throw new ApiError(401, ERROR_TYPE.NOT_ALLOWED, 'check_user', 'not allowed');
  }

  next();
}
