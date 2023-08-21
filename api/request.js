import axios from "axios";
import { Toast } from "antd-mobile";

export default function request(url, data = {}, type = "GET", headers = null) {
    console.log(url);
  return new Promise((resolve, reject) => {
    let promise;
    switch (type) {
      case "GET":
        promise = axios.get(url, {
          params: data,
          headers: headers,
        });
        break;
      case "POST":
        promise = axios.post(url, data);
        break;
      case "DELETE":
        promise = axios.delete(url, data);
        break;
      default:
        break;
    }
    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        Toast.show({
          content: err.response.data.message,
        });
      });
  });
}
