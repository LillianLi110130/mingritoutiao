import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
// import { useNavigate } from "react-router-dom";
import { Button, Input, Toast } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
// import debouce from "../../tools/debouce";
// import { userLogin } from "../../api";
// import { user_status } from "../../utils/localUtils";
import styles from "./login.module.css";
// import logo from "../../assets/images/logo.png";

export default function Login() {
  const [cansubmit, setSubmit] = useState(false);
  const username = useRef("");

  const passwd = useRef("");

  const back = () => {
    window.history.back();
    // navigate("/");
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

  const login = async () => {
    const data = await userLogin(username.current, passwd.current);
    if (data.length === 0) {
      //没有该用户
      Toast.show({
        icon: "fail",
        content: "用户名或密码错误",
      });
    } else {
      const { id } = data[0];
      const user = { username: username.current, user_id: id };
      user_status.saveUser(user);
      window.history.back();
    }
  };

  const toRegister = () => {
    // navigate("/register");
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
        <img src='/images/logo.png' alt="logo" />
        <Input
          className={styles.loginInput}
          id="user_input"
          placeholder="请输入用户名"
          clearable
          onChange={(e) => Userdeboucefn(e)}
          // onChange={e => debouce(changeUsername, 1000, e)()}
        />
        <Input
          className={styles.loginInput}
          placeholder="请输入密码"
          type="password"
          clearable
          onChange={(e) => Passdeboucefn(e)}
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
