import request from "../utils/axios";

export default {
  list: ({ search }: { search?: string }) => {
    return new Promise((resolve, reject) => {
      request.get('/files', { params: { name: search } })
        .then((res: any) => resolve(res.data))
        .catch((err) => reject(err));
    });
  },
  create: (payload: any) => {
    return new Promise((resolve, reject) => {
      request.post('/files', payload)
        .then((res: any) => resolve(res.data))
        .catch((err) => reject(err));
    });
  },
  delete: (id: number) => {
    return new Promise((resolve, reject) => {
      request.delete('/files/' + id)
        .then((res: any) => resolve(res.data))
        .catch((err) => reject(err));
    });
  },
}
