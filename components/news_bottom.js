import React from "react";
import { Toast } from "antd-mobile";
import { MessageOutline, LinkOutline } from "antd-mobile-icons";
// import Stars from "./stars";
// import Likes from "./likes";
import styles from "./news_bottom.module.css";

export default function NewsBottom(props) {
  const commentClick = () => {
    Toast.show({
      content: "还没做",
    });
  };
  const shareClick = () => {
    Toast.show({
      content: "还没做",
    });
  };
  return (
    <div className={styles.newsBottomContainer}>
      <div className={styles.newsBottomComment} onClick={commentClick}>
        &nbsp;&nbsp;写评论...
      </div>
      &nbsp;
      <MessageOutline fontSize={"0.8rem"} onClick={commentClick} /> &nbsp;
      {/* <Stars news_id={props.news_id} /> &nbsp; */}
      {/* <Likes news_id={props.news_id} /> &nbsp; */}
      <LinkOutline fontSize={"0.8rem"} onClick={shareClick} />
    </div>
  );
}
