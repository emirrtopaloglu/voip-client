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
    if (isServer) {
      const { cookies } = await import("next/headers");
      const token = cookies().get("accessToken")?.value;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } else {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
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
    if (Array.isArray(error?.response?.data?.error)) {
      error?.response?.data?.error?.map((err: string) => {
        toast.error(err);
      })
    } else {
      toast.error(error?.response?.data?.error);
    }
    // switch (error?.response?.status) {
    //   case 401:
    //     if (isServer) {
    //       const { cookies } = await import("next/headers");
    //       cookies().set("token", "", {
    //         path: "/",
    //         expires: new Date(0)
    //       });
    //       cookies().set("refreshToken", "", {
    //         path: "/",
    //         expires: new Date(0)
    //       });
    //     } else {
    //       document.cookie =
    //         "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //       window.location.href = "/admin/auth/login";
    //       toast.error("Session expired please login again.");
    //     }
    // }
    return Promise.reject(error);
  }
);

export default axios;
