import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NavBar, DotLoading, Empty } from "antd-mobile";
import NewsCardA from "../components/news_card_a";
import { useAuth } from "../hooks/useAuth";
import { mylikes } from "../api/userapi";
import { current_router_status } from "../utils/memoryUtils";
import styles from "./mylikes.module.css";

export default function MyStars() {
  useAuth();
  const router = useRouter();
  const [star_items, setItems] = useState(
    <div
      style={{
        marginTop: "1rem",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <DotLoading style={{ fontSize: "0.6rem" }} />
    </div>
  );

  const toDetail = (item_id, source, publish_time, title) => {
    router.push({
      pathname: "/detail/[id]",
      query: {
        id: item_id,
        source,
        publish_time,
        title,
      },
    });
  };

  const getLikes = async () => {
    try {
      const data = await mylikes();
      if (data.length === 0) {
        setItems(
          <Empty
            description="暂无数据"
            style={{ width: "100%", marginTop: "50%" }}
          />
        );
      } else {
        let item = [];
        for (let idx in data) {
          const { news_id, source, publish_time, title } = data[idx];
          item.push(
            <div
              key={idx}
              onClick={() => toDetail(news_id, source, publish_time, title)}
            >
              <NewsCardA
                title={title}
                datetime={publish_time}
                source={source}
              />
            </div>
          );
        }
        setItems(<div className={styles.content}>{item}</div>);
      }
    } catch (err) {
      console.log(err);
      if (err.status === 403) {
        current_router_status.setCurrent("/mylikes");
        router.push("/login");
      }
    }
  };
  useEffect(() => {
    getLikes();
  }, []);
  return (
    <>
      <NavBar
        className={styles.top}
        onBack={() => {
          window.history.back();
        }}
      >
        我的收藏
      </NavBar>
      <div className={styles.container}>{star_items}</div>
    </>
  );
}
