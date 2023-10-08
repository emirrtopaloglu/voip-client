import Axios, { InternalAxiosRequestConfig } from "axios";
import { isServer } from "./utils";
import toast from "react-hot-toast";

const baseURL = "/";

const axios = Axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // if (isServer) {
    //   const { cookies } = await import("next/headers");
    //   const token = cookies().get("accessToken")?.value;

    //   if (token) {
    //     config.headers["Authorization"] = `Bearer ${token}`;
    //   }
    // } else {
    //   const token = document.cookie.replace(
    //     /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
    //     "$1"
    //   );
    //   if (token) {
    //     config.headers["Authorization"] = `Bearer ${token}`;
    //   }
    // }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (!isServer) {
      if (Array.isArray(error?.response?.data?.error)) {
        error.response.data.error.forEach((err: string) => {
          toast.error(err);
        });
      } else {
        toast.error(error?.response?.data?.error);
      }
    }

    const originalRequest = error.config;
    if (error.response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await axios.get("/api/auth/refresh-token");

      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axios;
