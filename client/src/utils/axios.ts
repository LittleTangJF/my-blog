import axios from "axios";
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_ENV == "development"
    ? "http://119.91.156.37/web/v1"
    : "http://119.91.156.37/web/v1";
// axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  function (config) {
    if (process.browser) {
      if (!config.headers) config.headers = {};
      config.headers.authorization = localStorage.token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
