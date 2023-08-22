import axios from "axios";

import { user_status } from "../utils/localUtils";
import { Toast } from "antd-mobile";

export default function request(url, data = {}, type = "GET", headers = null) {
  const instance = axios.create({
    timeout: 30 * 1000,
  });
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
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
      if (error.response.status === 403 || error.response.status === 401) {
        user_status.removeUser();
        Toast.show({
          icon: "fail",
          content: error.response.data.message,
        });
        if (error.response.status === 403) {  //未登录的情况，TODO：记录是从哪个页面跳转过来的（不能用useRouter
          const router = useRouter();
          const { asPath } = router;
          router.push({
            pathname: "/login",
            query: {
              as: asPath,
            },
          });
        }
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
