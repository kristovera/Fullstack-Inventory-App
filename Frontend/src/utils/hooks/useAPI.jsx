import axios from "axios";
import { useContext } from "react";
import useMessage from "./useMessage.jsx";
import { UtilStateContextBase } from "../states/contexts";

const useAPI = () => {
  const context = useContext(UtilStateContextBase);
  const message = useMessage();

  const buildConfig = (params = {}) => {
    return {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params,
    };
  };

  const buildURL = (endpoints = []) => {
    return `${import.meta.env.VITE_BASE_URL}/${endpoints.join("/")}`;
  };

  const http = axios.create({
    timeout: 25000,
  });

  http.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    (response) => {
      const {
        config: { method },
      } = response;
      if (method !== "get") {
        message.success(response);
      }
      return response;
    },
    (error) => {
      const { status } = error.response;
      switch (status) {
        case 500:
        case 404:
        case 400:
          message.error(error);
          return Promise.reject(error);
        case 401:
          console.log("401");
          message.error(error);
          context.auth.signOut();
          return Promise.reject(error);
        case 403:
          message.error(error);
          return Promise.reject(error);
      }
    }
  );

  return {
    http,
    buildConfig,
    buildURL,
  };
};

export default useAPI;
