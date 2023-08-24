import React from "react";
import { useRouter } from "next/router";
import { NavBar, Dialog } from "antd-mobile";
import { MoreOutline } from "antd-mobile-icons";
import { user_status } from "../utils/localUtils";
import { username_status } from "../utils/localUtils";

export default function Top(props) {
  let left, right;
  const router = useRouter();
  const logout = () => {
    Dialog.confirm({
      content: "是否退出登录",
      onConfirm: () => {
        user_status.removeUser();
        username_status.removeUserName();
        router.push("/");
      },
    });
  };
  switch (props.title) {
    case "新闻":
      left = null;
      right = null;
      break;
    case "我的":
      left = null;
      right = <MoreOutline fontSize="0.6rem" onClick={logout} />;
      break;
    default:
      left = null;
      right = null;
  }
  return (
    <NavBar
      className="nav-bar"
      children={<span style={{ fontSize: "0.5rem" }}>{props.title}</span>}
      right={right}
      back={left}
      backArrow={false}
    ></NavBar>
  );
}
