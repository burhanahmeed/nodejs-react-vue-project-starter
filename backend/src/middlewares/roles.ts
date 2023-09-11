import { Request, Response, NextFunction } from 'express'
import ApiError from '../utils/apiError';
import { ERROR_TYPE } from '../constants/auth';
import { PERMISSION } from '../constants/roles';

export const useRules = (rules: string | string[]) => {
  return (_req: Request, res: Response, next: NextFunction) => {
    const rulesArray = typeof rules === 'string' ? [rules] : rules;

    const role: keyof typeof PERMISSION = res.locals.role?.toUpperCase();

    for (let index = 0; index < rulesArray.length; index++) {
      const element = rulesArray[index];
      if (!PERMISSION[role].includes(element)) {
        throw new ApiError(401, ERROR_TYPE.NOT_ALLOWED, 'check_user', 'permission is not allowed');
      }
    }

    next();
  }
}
