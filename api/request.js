import axios from "axios";
import { user_status } from "../utils/localUtils";
import { Toast } from "antd-mobile";

export default function request(url, data = {}, type = "GET", headers = null) {
  const instance = axios.create({
    timeout: 10 * 1000,
  });
  instance.interceptors.request.use(
    function (config) {
      const token = user_status.getUser();
      if (token) {
        config.headers["Authorization"] = token;
      }
      return config;
    },
    function (error) {
      return new Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (!error.response || !error.response.status) {
        return Promise.reject(error);
      }
      if (
        error.response.status === 500 ||
        error.response.status === 502 ||
        error.response.status === 503
      ) {
        Toast.show({
          icon: "fail",
          content: "服务器错误！",
        });
      }
      if (error.message.indexOf("timeout") !== -1) {
        Toast.show({
          icon: "fail",
          content: "网络超时！",
        });
      }
      return Promise.reject(error.response);
    }
  );
  return new Promise((resolve, reject) => {
    let promise;
    switch (type) {
      case "GET":
        promise = instance.get(url, {
          params: data,
          headers: headers,
        });
        break;
      case "POST":
        promise = instance.post(url, data);
        break;
      case "DELETE":
        promise = instance.delete(url, data);
        break;
      default:
        break;
    }
    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
