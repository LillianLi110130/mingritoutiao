import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./layout.module.css";
import Top from "./top";
import Bottom from "./bottom";

const title_list = {
  news: "新闻",
  recommend: "推荐",
  mine: "我的",
};

export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  let now;
  switch (pathname) {
    case "/":
      now = "news";
      break;
    case "/news":
      now = "news";
      break;
    case "/recommend":
      now = "recommend";
      break;
    case "/mine":
      now = "mine";
      break;
  }
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.top}>
          <Top title={title_list[now]} />
        </div>
        <div className={styles.body}>{children}</div>
        <div className={styles.bottom}>
          <Bottom />
        </div>
      </div>
    </div>
  );
}
