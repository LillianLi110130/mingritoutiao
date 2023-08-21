import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { NavBar } from "antd-mobile";
import { getNewsDetail } from "../api/newsapi";
import NewsBottom from "../components/news_bottom";
import modifyHtmlText from "../utils/htmlTextModify";
// import NewsBottom from "../../components/news_bottom/news_bottom";
import styles from "./detail.module.css";

export default function NewsDetail() {
  const router = useRouter();
  const contentRef = useRef();
  const {
    query: { item_id, source, publish_time, title },
  } = router;
  console.log(item_id, source, publish_time, title);

  const back = () => {
    window.history.back();
  };

  async function getNews(item_id) {
    console.log(item_id);
    const response = getNewsDetail(item_id);
    response
      .then((data) => {
        console.log(data);
        let {
          data: { content },
        } = data;
        content = modifyHtmlText(
          content,
          0.95 * document.documentElement.clientWidth
        );
        console.log(content);
        return content;
      })
      .then((content) => {
        contentRef.current.innerHTML = content;
      });
  }

  useEffect(() => {
    if (item_id) {
      getNews(item_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item_id]);

  return (
    <div className={styles.newsDetailContainer}>
      {
        <>
          <NavBar onBack={back} className={styles.newsDetailNavigate}>
            {source}
          </NavBar>
          <div className={styles.newsDetailTitle}>
            <h1>{title}</h1>
            <p>
              {source}&nbsp;{publish_time}
            </p>
          </div>
          <div
            id={styles.newsDetailContent}
            ref={(e) => (contentRef.current = e)}
          ></div>
        </>
      }
      <NewsBottom news_id={item_id} />
    </div>
  );
}
