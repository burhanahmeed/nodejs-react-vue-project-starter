import request from "../utils/axios";

export default {
  list: () => {
    return new Promise((resolve, reject) => {
      request.get('/users/roles')
        .then((res: any) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}
