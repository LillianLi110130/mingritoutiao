import request from "./request";
import { Toast } from "antd-mobile";

// const base = "http://localhost:3000/api/";
const base = "/api/";

export const getNewsFromCategory = function (type) {
  return request(`${base}getnews?category=${type}`);
};

export const getNewsDetail = function (itemId) {
  return request(`${base}getdetail?itemid=${itemId}`);
};
