import { Response, NextFunction } from 'express';
import ApiError from '../utils/apiError';

export default async (err: any, req: any, res: Response, _next: NextFunction) => {
  if (req && req.log) {
    // log all errors here
    req.log.error(err.message, {
      ...err,
      stack: err.stack,
      reqId: req.id,
    });
  }

  const standardResponse = {
    error:
      err instanceof ApiError
        ? err.toExternalResponse()
        : { ...err, message: err.message },
  };

  // additional checking for unit test
  return res.status ? res.status(err.status || 500).send(standardResponse) : res;
};
