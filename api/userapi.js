import request from "./request";
import { user_status } from "../utils/sessionUtils";

const base = "http://localhost:3000/";
export const userRegister = function (username, password) {
  return request(`${base}register`, { username, password }, "POST");
};

export const userLogin = function(username, password) {
    return new Promise((resolve, reject)=>{
        request(`${base}login`, {username, password}, "POST")
        .then(data=>{
            user_status.saveUser(data.token);
            resolve();
        })
        .catch(err=>{
            reject(err);
        })
    })
}