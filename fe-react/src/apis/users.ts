import request from "../utils/axios";

export default {
  list: ({ page, size, search }: { search?: string; page: number, size: number }) => {
    return new Promise((resolve, reject) => {
      request.get('/users', { params: { page, size, search } })
        .then((res: any) => resolve(res.data))
        .catch((err) => reject(err));
    });
  },
  create: (payload: any) => {
    return new Promise((resolve, reject) => {
      request.post('/users', payload)
        .then((res: any) => resolve(res.data))
        .catch((err) => reject(err));
    });
  },
  delete: (id: number) => {
    return new Promise((resolve, reject) => {
      request.delete('/users/' + id)
        .then((res: any) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}
