import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Router, useRouter } from "next/router";
import Category from "./category";
import { getNewsFromCategory } from "../api/newsapi";
import NewsCardA from "./news_card_a";
import NewsCardC from "./news_card_c";
import { InfiniteScroll, List, DotLoading } from "antd-mobile";
// import VariableSizeList from '../../components/virtualize_list/virtualize_list'
import { category_status, heights_status } from "../utils/sessionUtils";
import styles from "./news.module.css";

const Item = (props) => {
  const { index, data } = props;
  const router = useRouter();
  const { item_id, title, source, publish_time, image_list } = data;
  let item;
  if (image_list.length === 0) {
    item = <NewsCardA title={title} source={source} datetime={publish_time} />;
  } else {
    item = (
      <NewsCardC
        title={title}
        source={source}
        datetime={publish_time}
        img={image_list.slice(0, 4)}
      />
    );
  }
  const onClick = () => {
    router.push({
      pathname: "/detail",
      query: {
        item_id: item_id,
        source: source,
        publish_time: publish_time,
        title: title,
      },
    });
  };
  return <div onClick={onClick}>{item}</div>;
};

export default function News_() {
  const [show_list, setShowList] = useState([]);
  //   const estimatedItemHeight = clientWidth * 0.2;
  let [category, setCategory] = useState("news_hot");
  const listRef = useRef([]);
  const containerRef = useRef();
  const [showMore, setShowMore] = useState(false);
  // const showMore = useRef(false);

  async function loadMore() {
    try {
      const news = await getNews();
      renderNews(news);
    } catch (error) {
      throw new Error(error);
    }
  }
  async function loadNews() {
    try {
      const news = await getNews();
      renderNews(news);
    } catch (error) {
    }
  }
  function getNews() {
    const category = category_status.getCategory();
    setCategory(category);
    return new Promise((resolve, reject) => {
      getNewsFromCategory(category)
        .then((res) => {
          const { data } = res;
          const response_news_list = data.map((news) => {
            const { item_id, title, source, publish_time, image_list } = news;
            //处理日期显示
            const date = new Date(publish_time * 1000);
            const datetime = `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            return {
              item_id: item_id,
              title: title,
              source: source,
              publish_time: datetime,
              image_list: image_list,
            };
          });
          // renderNews(response_news_list);
          resolve(response_news_list);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  function renderNews(data) {
    const base_idx = listRef.current.length;
    let list = data.map((item, idx) => {
      return <Item key={base_idx + idx} index={base_idx + idx} data={item} />;
    });
    list = [...listRef.current, ...list];
    listRef.current = list;
    // showMore.current = true;
    setShowMore(true);
    setShowList(list);
  }

  function resetList() {
    listRef.current = [];
    setShowMore(false);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
      });
    }
  }

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll, true);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  // const handleScroll = () => {
  //   //加个节流
  //   if (containerRef.current.scrollTop > 100) {
  //     //加个回到顶部的button
  //   }
  // };

  return (
    <>
      <div className={styles.cate}>
        <Category
          category={category}
          get_news={loadNews}
          reset_list={resetList}
        />
      </div>
      <div className={styles.newsContainer} ref={containerRef}>
        {listRef.current.length === 0 ? (
          <DotLoading color="primary" style={{ marginTop: "1rem" }} />
        ) : (
          <>
            <List>{show_list}</List>
            {showMore ? (
              <InfiniteScroll loadMore={loadMore} hasMore={true} />
            ) : null}
          </>
        )}
      </div>
    </>
  );
}
