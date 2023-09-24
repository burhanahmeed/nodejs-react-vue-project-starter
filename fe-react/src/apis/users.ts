import request from "../utils/axios";

export default {
  list: ({ page, size, search }: { search?: string; page: number, size: number }) => {
    return new Promise((resolve, reject) => {
      request.get('/users', { params: { page, size, search } })
        .then((res: any) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}
