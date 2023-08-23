import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { StarOutline, StarFill } from "antd-mobile-icons";
import { user_status } from "../utils/localUtils";

export default function Stars(props) {
  const [isStar, setStar] = useState(false);
  const navigate = useNavigate();
  const category = category_status.getCategory();
  const user = user_status.getUser();
  const { user_id } = user;

  const starthisNews = async () => {
    if (user_id !== undefined) {
      const star = await starNews(props.news_id, user_id, category);
      const { id } = star;
      if (sessionStorage.getItem("tempStar")) {
        sessionStorage.removeItem("tempStar");
      }
      sessionStorage.setItem("tempStar", String(id));
      setStar(true);
    } else {
      navigate("/login");
    }
  };

  const unstarThisNews = async () => {
    const star_id = sessionStorage.getItem("tempStar");
    await unstarNews(star_id);
    setStar(false);
  };

  let item = isStar ? (
    <StarFill fontSize={"0.8rem"} color="#FFE300" onClick={unstarThisNews} />
  ) : (
    <StarOutline fontSize={"0.8rem"} onClick={starthisNews} />
  );

  useEffect(() => {
    // async function getStarStatus() {
    //   const star = await getStar(props.news_id, user_id);
    //   if (star.length === 0) {
    //     setStar(false);
    //   } else {
    //     const { id } = star[0];
    //     sessionStorage.setItem("tempStar", String(id));
    //     setStar(true);
    //   }
    // }
    if (user_id === undefined) return;
    getStarStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>{item}</div>;
}
