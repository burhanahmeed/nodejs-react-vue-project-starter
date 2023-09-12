import { IFindOptions } from "../types/base";
import ApiError from "../utils/apiError";
import FormValidationError from '../utils/formValidationError';

export default class BaseController {
  public static getPagingData(data: any, page: number, limit: number) {
    const { count: totalItems, rows } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, data: rows, totalPages, currentPage };
  }

  public static buildPaginationOpts(page: number, size: number) {
    if (page && size) {
      return {
        limit: size,
        offset: page && size ? (page - 1) * size : 0,
      };
    }

    return {};
  }

  public static throwNotFoundError(code: string, message: string, data?: any) {
    throw new ApiError(404, 'not_found', code, message, data);
  }

  public static throwNotAllowed(code: string, message: string, data?: any) {
    throw new ApiError(401, 'not_allowed', code, message, data);
  }

  public static throwBadRequest(code: string, message: string, data?: any) {
    throw new ApiError(400, 'bad_request', code, message, data);
  }

  public static throwInternalServerError(code: string, message: string, data?: any) {
    throw new ApiError(500, 'internal_server_error', code, message, data);
  }

  public static throwFormValidationError(code: string, error: any) {
    let msg = '';
    let errorData: any = Object.values(error)[0];

    errorData.forEach((e: any, i: number) => {
      msg += e;
      if (i < errorData.length - 1) {
        msg += ', ';
      }
    });

    throw new FormValidationError(code, msg, error);
  }
}

export const Base = new BaseController();
