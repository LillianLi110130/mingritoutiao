import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { Tabs, Toast } from "antd-mobile";
import { AppstoreOutline } from "antd-mobile-icons";
import { category_status } from "../utils/sessionUtils";
import styles from "./category.module.css";

const { Tab } = Tabs;

export default function Category(props) {
  const [category, setCategory] = useState("news_hot");
  const categoryRef = useRef(category);
  const tabs = [
    {
      title: "热点",
      key: "news_hot",
    },
    {
      title: "社会",
      key: "news_society",
    },
    {
      title: "娱乐",
      key: "news_entertainment",
    },
    {
      title: "科技",
      key: "news_tech",
    },
    {
      title: "军事",
      key: "news_military",
    },
    {
      title: "体育",
      key: "news_sports",
    },
    {
      title: "汽车",
      key: "news_car",
    },
    {
      title: "财经",
      key: "news_finance",
    },
    {
      title: "国际",
      key: "news_world",
    },
    {
      title: "时尚",
      key: "news_fashion",
    },
    {
      title: "旅游",
      key: "news_travel",
    },
    {
      title: "探索",
      key: "news_discovery",
    },
    {
      title: "育儿",
      key: "news_baby",
    },
    {
      title: "故事",
      key: "news_story",
    },
    {
      title: "游戏",
      key: "news_game",
    },
    {
      title: "历史",
      key: "news_history",
    },
    {
      title: "美食",
      key: "news_food",
    },
  ];

  const onChange = function (key) {
    // sessionStorage.setItem("category", key);
    category_status.saveCategory(key);
    setCategory(key);
    categoryRef.current = key;
    // props.switchNews();
    props.reset_list();
    props.get_news();
    
  };
  useEffect(() => {
    // sessionStorage.setItem("test", "123");
    let temp = category_status.getCategory();
    console.log(temp);
    if (!temp) {
      temp = "news_hot";
      category_status.saveCategory(temp);
    }
    setCategory(temp)
    props.reset_list();
    props.get_news();
  }, []);


  return (
    <div className={styles.tabsheader}>
      <Tabs
        style={{
          "--title-font-size": "0.48rem",
        }}
        activeKey={category}
        className={styles.tabs}
        onChange={onChange}
      >
        {tabs.map((value) => (
          <Tab title={value.title} key={value.key} />
        ))}
      </Tabs>
      <AppstoreOutline
        className={styles.moreIcon}
        onClick={() => {
          Toast.show({
            content: "别点了，还没做qaq",
          });
        }}
      />
    </div>
  );
}
