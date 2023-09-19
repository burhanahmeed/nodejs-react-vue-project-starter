import request from "../utils/axios";

export default {
  login: (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      request.post('/auth/login', { email, password })
        .then((res: any) => resolve(res.data))
        .catch((err) => reject(err));
    })
  },
  signup: (name: string, email: string, password: string) => {
    return new Promise((res, rej) => {
      request.post('/auth/register', { name, email, password })
        .then((resp: any) => res(resp.data))
        .catch((err) => rej(err));
    })
  }
}