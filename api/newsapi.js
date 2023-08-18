import request from "./request";
import { Toast } from "antd-mobile";

const base = 'http://localhost:3000/';

export const getNewsFromCategory = function(type) {
    return request(`${base}getNews?category=${type}`)
}