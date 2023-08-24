import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Toast } from "antd-mobile";
import authentication from "../utils/authentication";
import { mylikes } from "../api/userapi";
import { current_router_status } from "../utils/memoryUtils";
import { username_status } from "../utils/localUtils";
import Layout from "../components/layout";
import styles from "./mine.module.css";

export default function Mine() {
  const router = useRouter();
  const [num, setNum] = useState(0);
  const [username, setUsername] = useState("");

  const toLikes = () => {
    router.push("/mylikes");
  };

  const getLikesNum = async () => {
    try {
      const data = await mylikes();
      setNum(data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const notification = () => {
    Toast.show({
      content: "暂时还没做qaq",
    });
  };

  useEffect(() => {
    if (authentication()) {
      getLikesNum();
      const name = username_status.getUserName();
      if (name) {
        setUsername(name);
      }
    } else {
      current_router_status.setCurrent("/mine");
      router.push("/login");
    }
  }, []);

  return (
    <Layout>
      <div className={styles.userContainer}>
        <div className={styles.userDetail} onClick={notification}>
          <div className={styles.avatar}>这是头像</div>
          <div className={styles.userIntroduction}>
            <span style={{ fontSize: "0.6rem" }}>{username}</span>
            <span style={{ fontSize: "0.4rem", marginTop: "0.2rem" }}>
              这是个性签名xxxxxxxxxxxxx
            </span>
          </div>
        </div>

        <div className={styles.shareContainer}>
          <div className={styles.shareBox}>
            <span className={styles.text} onClick={notification}>
              评论
            </span>
            <span className={styles.number}>0</span>
          </div>
          <div className={styles.shareBox} onClick={toLikes}>
            <span className={styles.text}>点赞</span>
            <span className={styles.number}>{num}</span>
          </div>
        </div>

        {/* <div className={styles.userConfig}>
          一堆没有实现的选项卡 TODO:
          <div>主题颜色</div>
          <div>字体大小</div>
          <div>使用报告</div>
        </div> */}
      </div>
    </Layout>
  );
}
