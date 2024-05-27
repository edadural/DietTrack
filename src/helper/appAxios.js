// appAxios.js
import axios from "axios";
import { swalError, swalOk } from "./swal";

export const appAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL + "/api/",
  headers: {},
});

async function getToken() {
  const localStorageToken = localStorage.getItem("token");
  if (localStorageToken) {
    return localStorageToken;
  } else {
    return "";
  }
}

appAxios.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.token = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


appAxios.interceptors.response.use(
  (response) => {
    if (!response.data.message.toLowerCase().includes("veri")) {
      swalOk(response.data.message, null);
    }
    return response;
  },
  (error) => {
    if (error.response.status !== 401) {
      swalError(error.response.data.message, null)
    }
    if (error.response.status === 401) {
      swalError(error.response.data.message, () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = '/auth/sign-in';
      })
    }
    return Promise.reject(error);
  }
);
