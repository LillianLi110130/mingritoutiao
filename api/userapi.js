import request from "./request";

const base = "http://localhost:3000/";
export const userRegister = function (username, password) {
  return request(`${base}register`, { username, password }, "POST");
};
