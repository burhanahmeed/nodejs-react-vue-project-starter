import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
  },
});

export default request;
