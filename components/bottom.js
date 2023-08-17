import React from "react";
// import { useLocation, useNavigate } from 'react-router'
import { useRouter } from "next/router";
import { TabBar } from "antd-mobile";
import { AppOutline, UserOutline, EnvironmentOutline } from "antd-mobile-icons";
// import { user_status } from '../../utils/localUtils'
import styles from "./bottom.module.css";

const { Item } = TabBar;
export default function Bottom() {
  const router = useRouter();
  //   const navigate = useNavigate();
  const { pathname } = router;
  const tabs = [
    {
      key: "/",
      title: "首页",
      icon: <AppOutline />,
    },
    {
      key: "/recommend",
      title: "推荐",
      icon: <EnvironmentOutline />,
    },
    {
      key: "/mine",
      title: "我的",
      icon: <UserOutline />,
    },
  ];
  const setRouteActive = (value) => {
    // if (value === "mine") {
    //   //未登录的话跳转登录页
    //   const user = user_status.getUser();
    //   if (Object.getOwnPropertyNames(user).length === 0) {
    //     navigate("/login");
    //   } else {
    //     navigate(value);
    //   }
    // } else {
    //   navigate(value);
    // }
    router.push(value);
  };

  const getActiveKey = () => {
    return pathname;
  };

  return (
    <TabBar
      className={styles.tabbar}
      activeKey={getActiveKey()}
      onChange={(value) => setRouteActive(value)}
    >
      {tabs.map((item) => (
        <Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
}
