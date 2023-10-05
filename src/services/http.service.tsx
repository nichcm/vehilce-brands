import axios from "axios";
import appsettings from "../configs/appsettings.json";
import { ToastService } from "./toast.service";
import { store } from "../store/index";

// const showError = true;
let alertSessionExpired = false;

const HttpService = axios.create({
  baseURL: appsettings.API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  }
});

function BuildAuth() {
  const state = store.getState();
  const authToken = state?.authentication?.accessToken;
  return authToken;
}

HttpService.interceptors.request.use((config) => {
  let authentication = BuildAuth();
  if (authentication != null) {
    config.headers.authorization = `Bearer ${authentication}`;
  }

  return config;
});

HttpService.interceptors.response.use(
  function (response) {
    const result: any = response.data;
    if (result) {
      if(!result.success){
        ToastService.error(result.error)
      }
    }
    if (response.data.redirectRoute) {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    return response.data;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      if (alertSessionExpired === false) {
        alertSessionExpired = true;
        store.dispatch({
          type: "LOGOUT"
        });
        ToastService.info("Seu login expirou", null);
        // navigate("/Login");
      }
    } else if (error.response?.data?.error) {
      ToastService.error(error.response?.data?.error);

      // if (showError) {
      //   showError = false;
      // }
      // setTimeout(() => {
      //   showError = true;
      // }, 3000);
    }
    return Promise.reject(error);
  }
);

export default HttpService;
