import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import CryptoJS from "crypto-js";
import { Button, Input, Toast } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import { username_status } from "../utils/localUtils";
import debounce from "../utils/debounce";
import { userLogin } from "../api/userapi";
import { current_router_status } from "../utils/memoryUtils";
import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();
  const {
    query: { as },
  } = router;
  const prev_router = current_router_status.getCurrent();
  const [cansubmit, setSubmit] = useState(false);
  const username = useRef("");

  const passwd = useRef("");

  const back = () => {
    const { pathname, query } = prev_router;
    current_router_status.removeCurrent();
    if (pathname && pathname !== "/mine" && pathname !== "/mylikes") {
      router.push({
        pathname,
        query,
      });
    } else {
      router.push("/");
    }
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
    const hashPassrord = CryptoJS.SHA256(passwd.current).toString();
    userLogin(username.current, hashPassrord)
      .then((value) => {
        Toast.show("登录成功！");
        username_status.saveUserName(username.current);
        const { pathname, query } = prev_router;
        current_router_status.removeCurrent();
        if (pathname) {
          router.push({
            pathname,
            query,
          });
        } else {
          router.push("/");
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          Toast.show({
            icon: "fail",
            content: err.data.message,
          });
        }
      });
  };

  const toRegister = () => {
    if (as) {
      router.push({
        pathname: "/register",
        query: {
          as,
        },
      });
    } else {
      router.push("/register");
    }
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
          onChange={debounce(changeUsername, 300)}
          // onChange={(e) => Userdeboucefn(e)}
          // onChange={e => debouce(changeUsername, 1000, e)()}
          // onChange={changeUsername}
        />
        <Input
          className={styles.loginInput}
          placeholder="请输入密码"
          type="password"
          clearable
          // onChange={(e) => Passdeboucefn(e)}
          onChange={debounce(changePasswd, 300)}
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
