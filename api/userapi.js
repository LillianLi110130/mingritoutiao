import request from "./request";
import { user_status } from "../utils/localUtils";
import { Toast } from "antd-mobile";
import { resolve } from "styled-jsx/css";

// const base = "http://localhost:3000/api/";
const base = "/api/";

export const userRegister = function (username, password) {
  return request(`${base}register`, { username, password }, "POST");
};

export const userLogin = function (username, password) {
  return new Promise((resolve, reject) => {
    request(`${base}login`, { username, password }, "POST")
      .then((data) => {
        user_status.saveUser(data.token);
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getLike = function (news_id) {
  return new Promise((resolve, reject) => {
    request(`${base}getlike`, { newsId: news_id }, "POST")
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addLike = function (news_id, source, publish_time, title) {
  return new Promise((resolve, reject) => {
    request(
      `${base}addlike`,
      { newsId: news_id, source, publish_time, title },
      "POST"
    )
      .then((data) => {
        Toast.show(data.message);
        resolve();
      })
      .catch((err) => {
        Toast.show({
          icon: "fail",
          content: err.data.message,
        });
        reject(err);
      });
  });
};

export const unlike = function (news_id) {
  return new Promise((resolve, reject) => {
    request(`${base}deletelike`, { newsId: news_id }, "POST")
      .then((data) => {
        Toast.show(data.message);
        resolve();
      })
      .catch((err) => {
        Toast.show({
          icon: "fail",
          content: err.data.message,
        });
        reject(err);
      });
  });
};

export const mylikes = function () {
  return new Promise((resolve, reject) => {
    request(`${base}mylikes`)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
