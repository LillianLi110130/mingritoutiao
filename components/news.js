import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
// import { useNavigate } from 'react-router-dom'
import Category from "./category";
import { getNewsFromCategory } from "../api/newsapi";
import NewsCardA from "./news_card_a";
import NewsCardC from "./news_card_c";
import { InfiniteScroll, List } from "antd-mobile";
// import VariableSizeList from '../../components/virtualize_list/virtualize_list'
import { category_status, heights_status } from "../utils/sessionUtils";
import styles from "./news.module.css";

const Item = (props) => {
  const { index, data } = props;
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
  return <div>{item}</div>;
};

export default function News_() {
  let [content, setContent] = useState(null);
  // const [news_list, setList] = useState([]);
  const news_list = useRef([]);
  const [show_list, setShowList] = useState([]);
  //   const estimatedItemHeight = clientWidth * 0.2;
  let [category, setCategory] = useState("news_hot");
  const listRef = useRef([]);
  const heightsRef = useRef(new Array(100));
  //预估高度
  const getHeight = (index) => {
    if (
      heightsRef.current[index] === undefined ||
      heightsRef.current[index === 0]
    ) {
      return estimatedItemHeight;
    }
    return heightsRef.current[index];
  };

  async function loadMore() {}
  function getNews() {
    const category = category_status.getCategory();
    setCategory(category);
    getNewsFromCategory(category).then((res) => {
      const { data } = res;
      const response_news_list = data.map((news) => {
        const { item_id, title, source, publish_time, image_list } = news;
        // console.log(news);
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
      // news_list.current = response_news_list;
      renderNews(response_news_list);
      return response_news_list;
    });
    // .then((data) => {
    //   news_list.current = data;
    //   renderNews(data);
    // });
  }
  function renderNews(data) {
    let list = data.map((item, idx) => {
      return <Item key={idx} index={idx} data={item} />;
    });
    list = [...listRef.current, ...list];
    setShowList(list);
  }

  function resetList() {
    listRef.current = [];
  }

  return (
    <>
      <div className={styles.cate}>
        <Category
          category={category}
          get_news={getNews}
          reset_list={resetList}
        />
      </div>
      <List>{show_list}</List>
      <InfiniteScroll loadMore={loadMore} hasMore={true} />
    </>
  );
}
