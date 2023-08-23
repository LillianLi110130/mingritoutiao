import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Button, Input, Toast } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
// import debouce from '../../tools/debouce'
// import { user_status } from '../../utils/localUtils'
import { userRegister } from "../api/userapi";
import styles from "./register.module.css";

export default function Register() {
  const [cansubmit, setSubmit] = useState(false);
  const username = useRef("");
  const passwd = useRef("");
  const repeatPwd = useRef("");
  const router = useRouter();
  const {
    query: { as },
  } = router;

  const back = () => {
    router.back();
    // router.push("/");
    // navigate("/");
  };

  const changeUsername = (value) => {
    username.current = value;
    //都输入了用户名和密码时提交button才可用
    if (username.current && passwd.current && repeatPwd.current) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  };

  const changePasswd = (value) => {
    passwd.current = value;
    if (username.current && passwd.current && repeatPwd.current) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  };

  const repeatPasswd = (value) => {
    repeatPwd.current = value;
    if (username.current && passwd.current && repeatPwd.current) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  //   const userDeboucefn = useCallback(debouce(changeUsername, 500), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  //   const passDeboucefn = useCallback(debouce(changePasswd, 500), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  //   const repeatDeboucefn = useCallback(debouce(repeatPasswd, 500), []);

  const register = async () => {
    if (repeatPwd.current !== passwd.current) {
      Toast.show({
        icon: "fail",
        content: "两次输入的密码不一致！",
        duration: 1000,
      });
    } else {
      userRegister(username.current, passwd.current)
        .then((data) => {
          router.push("/login");
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    }
  };

  useEffect(() => {
    // const user = user_status.getUser();
    //   if (Object.getOwnPropertyNames(user).length !== 0) {
    //     navigate("/home/mine");
    //   }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.back} onClick={back}>
        <CloseOutline fontSize={"0.5rem"} color="var(--adm-color-weak)" />
      </div>
      <div className={styles.registerContainer}>
        <img src="/images/logo.png" alt="logo" />
        <Input
          className={styles.registerInput}
          placeholder="请输入用户名"
          clearable
          //   onChange={e => userDeboucefn(e)}
          onChange={changeUsername}
        />
        <Input
          className={styles.registerInput}
          placeholder="请输入密码"
          type="password"
          clearable
          // onChange={(e) => passDeboucefn(e)}
          onChange={changePasswd}
        />
        <Input
          className={styles.registerInput}
          placeholder="请确认密码"
          type="password"
          clearable
          // onChange={(e) => repeatDeboucefn(e)}
          onChange={repeatPasswd}
        />
        <Button
          block
          color="primary"
          className={styles.registerButton}
          disabled={!cansubmit}
          loading="auto"
          onClick={register}
        >
          注册
        </Button>
      </div>
    </div>
  );
}
