
import styles from '../components/Home/home.module.scss';
import {Button, Drawer, message, Progress, Slider} from "antd";
import {useEffect, useState} from "react";
import {RightOutlined} from "@ant-design/icons";
import {copyLink, splitWalletAddress} from "@/utils/addressUtil";
import {useSelector} from "react-redux";
import useDispatchAction from "@/hooks/useDisptachAction";
import {setWalletInfo} from "@/redux/actions/home";
import {useRouter} from "next/router";
import {t} from "i18next";
import SearchBar from "@/components/SearchBar";
import HomeCard from "@/components/HomeCard";
import SortBy from "@/components/SoryBy";

const Home = ( ) =>{
  return <div className={styles.home_page}>
    <SearchBar></SearchBar>
    <div className={styles.sort_wrap}>
      <SortBy></SortBy>
    </div>
    <div className={styles.grid_container}>
      <HomeCard></HomeCard>
      <HomeCard></HomeCard>
      <HomeCard></HomeCard>
    </div>
  </div>;
};

export default Home;
