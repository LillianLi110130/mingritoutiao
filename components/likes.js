import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HeartOutline, HeartFill } from "antd-mobile-icons";
import { user_status } from "../utils/localUtils";
import { current_router_status } from "../utils/memoryUtils";
import { getLike, addLike, unlike } from "../api/userapi";

export default function Likes(props) {
  const [isLike, setLike] = useState(false);
  const { news_id } = props;
  const router = useRouter();
  const user = user_status.getUser();

  const likeThisNews = async () => {
    if (user !== undefined) {
      try {
        await addLike(news_id);
        setLike(true);
      } catch (err) {
        //登录过期的处理
        // router.push({
        //   pathname: "/login",
        // });
        if (err.status === 403) {
          current_router_status.setCurrent(router.pathname, router.query);
          router.push("/login")
        }
      }
    } else {
      console.log(router);
    }
  };

  const unlikeThisNews = async () => {
    try {
      await unlike(news_id);
      setLike(false);
    } catch (err) {
      //未登录的处理
      console.log(err);
    }
  };

  let item = isLike ? (
    <HeartFill fontSize={"0.8rem"} color="red" onClick={unlikeThisNews} />
  ) : (
    <HeartOutline fontSize={"0.8rem"} onClick={likeThisNews} />
  );
  async function getLikeStatus() {
    try {
      const star = await getLike(news_id);
      const { code } = star;
      if (code === 0) {
        setLike(false);
      } else {
        setLike(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (user) {
      getLikeStatus();
    }
  }, []);
  return <div>{item}</div>;
}
