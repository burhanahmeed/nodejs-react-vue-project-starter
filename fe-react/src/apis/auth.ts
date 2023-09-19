import request from "../utils/axios";

export default {
  login: (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      request.post('/auth/login', { email, password })
        .then((res: any) => resolve(res.data))
        .catch((err) => reject(err));
    })
  }
}