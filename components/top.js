import React from "react";
import { NavBar, Dialog } from "antd-mobile";
import { MessageOutline, MoreOutline } from "antd-mobile-icons";

export default function Top(props) {
  let left, right;
  switch (props.title) {
    case "新闻":
      left = null;
      right = null;
      break;
    case "我的":
      left = <MessageOutline fontSize="0.6rem" />;
      right = <MoreOutline fontSize="0.6rem" />;
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
