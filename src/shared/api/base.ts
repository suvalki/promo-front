import { env } from "../config/env";
import { Api, HttpClient } from "./gen/api";

const httpClient = new HttpClient({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

httpClient.instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res && typeof res === "object" && "success" in res) {
      if (res.success === false && res.error) {
        return Promise.reject({
          response: {
            data: res,
          },
        });
      }
      if (res.success === true && "data" in res) {
        response.data = res.data;
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const api = new Api(httpClient);

export const axiosInstance = httpClient.instance;
