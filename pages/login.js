import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
// import { useNavigate } from "react-router-dom";
import { Button, Input, Toast } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
// import debouce from "../../tools/debouce";
import { userLogin } from "../api/userapi";
import { user_status } from "../utils/sessionUtils";
import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();
  const [cansubmit, setSubmit] = useState(false);
  const username = useRef("");

  const passwd = useRef("");

  const back = () => {
    window.history.back();
  };

  const changeUsername = (value) => {
    username.current = value;
    //都输入了用户名和密码时提交button才可用
    if (username.current && passwd.current) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  };

  const changePasswd = (value) => {
    passwd.current = value;
    if (username.current && passwd.current) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const Passdeboucefn = debouce(changePasswd, 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const Userdeboucefn = debouce(changeUsername, 500);

  const login = () => {
    userLogin(username.current, passwd.current)
    .then(value=>{
      Toast.show("登录成功！");
      window.history.back();
    })
    .catch(err=>{
      console.log(err);
    })
  };

  const toRegister = () => {
    router.push("/register");
  };

  useEffect(() => {
    // const user = user_status.getUser();
    // if (Object.getOwnPropertyNames(user).length !== 0) {
    //   navigate("/home/mine");
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.back} onClick={back}>
        <CloseOutline fontSize={"0.5rem"} color="var(--adm-color-weak)" />
      </div>
      <div className={styles.loginContainer}>
        <img src="/images/logo.png" alt="logo" />
        <Input
          className={styles.loginInput}
          id="user_input"
          placeholder="请输入用户名"
          clearable
          // onChange={(e) => Userdeboucefn(e)}
          // onChange={e => debouce(changeUsername, 1000, e)()}
          onChange={changeUsername}
        />
        <Input
          className={styles.loginInput}
          placeholder="请输入密码"
          type="password"
          clearable
          // onChange={(e) => Passdeboucefn(e)}
          onChange={changePasswd}
        />
        <Button
          block
          color="primary"
          className={styles.loginButton}
          disabled={!cansubmit}
          loading="auto"
          onClick={login}
        >
          登录
        </Button>
        <a href="#!" onClick={toRegister}>
          还没有账号？去注册账号
        </a>
      </div>
    </div>
  );
}
