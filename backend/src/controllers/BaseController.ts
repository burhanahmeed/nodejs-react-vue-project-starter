export default class BaseController {
  public static getPagingData(data: any, page: number, limit: number) {
    const { count: totalItems, rows } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, data: rows, totalPages, currentPage };
  }
}

export const Base = new BaseController();
