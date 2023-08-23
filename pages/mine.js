import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Toast } from "antd-mobile";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/layout";
import { user_status } from "../utils/localUtils";
import styles from "./mine.module.css";

export default function Mine() {
  useAuth();
  const [nums, setNums] = useState(0);
  const user = user_status.getUser();
  const { username } = user;

  const toStars = () => {
    navigate("/mystars");
  };

  const toLikes = () => {
    navigate("/mylikes");
  };

  const getStarsAndLikesNum = async () => {
    const star_num = await getUserStars(user.user_id);
    const like_num = await getUserLikes(user.user_id);
    setNums([like_num.length, star_num.length]);
  };

  const notification = () => {
    Toast.show({
      content: "暂时还没做qaq",
    });
  };

  useEffect(() => {
    // getStarsAndLikesNum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <span className={styles.number}>{nums}</span>
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
