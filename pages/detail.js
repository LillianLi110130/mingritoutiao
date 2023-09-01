import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { NavBar } from "antd-mobile";
import { getNewsDetail } from "../api/newsapi";
import NewsBottom from "../components/news_bottom";
import modifyHtmlText from "../utils/htmlTextModify";
import styles from "./detail.module.css";

export default function NewsDetail() {
  const router = useRouter();
  console.log(router);
  const contentRef = useRef();
  const {
    query: { id, source, publish_time, title },
  } = router;

  const back = () => {
    router.back();
  };

  async function getNews(id) {
    console.log(id);
    const response = getNewsDetail(id);
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
    if (id) {
      getNews(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
      <NewsBottom data={{ id, source, publish_time, title }} />
    </div>
  );
}
