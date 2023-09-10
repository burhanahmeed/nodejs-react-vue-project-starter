import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError';
import { ERROR_TYPE, JWT_KEY } from '../constants/auth';
import { Users } from '../services/UserService';

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req?.headers?.authorization;
    if (!authorization) {
      throw new ApiError(401, ERROR_TYPE.NOT_ALLOWED, 'middleware', 'token not found');
    }

    const token = authorization.split(' ');
    if (!token?.[1]) {
      throw new ApiError(401, ERROR_TYPE.NOT_ALLOWED, 'middleware', 'token not found');
    }

    if (!jwt.verify(token[1], JWT_KEY)) {
      throw new ApiError(401, ERROR_TYPE.NOT_ALLOWED, 'middleware', 'token is not valid');
    }

    const decoded: any = jwt.decode(token[1]);
    if (!decoded) {
      throw new ApiError(401, ERROR_TYPE.NOT_ALLOWED, 'middleware', 'token is not valid');
    }

    const user = await Users.getById(Number(decoded.id));
    if (!user) {
      throw new ApiError(401, ERROR_TYPE.NOT_ALLOWED, 'middleware', 'token is not valid');
    }

    res.locals.user = user;
    res.locals.role = user.role.name;

    next();
  } catch (error) {
    next(error);
  }
};
