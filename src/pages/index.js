
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
import {APIGetProductList} from "@/api";
import {getQueryString} from "@/utils/action";

let data = [];

const Home = ( ) =>{

  const [prodList, setProdList] = useState(data);

  const getProdList = () =>{
    APIGetProductList(JSON.stringify({
      sort: 1,
      page: 1,
      pageSize: 100
    })).then(resp=>{
      if (resp){
        setProdList(resp.data.list.records);
        data = resp.data.list.records;
        console.log(resp, "respresp");
      }
    });
  };

  const getToken = () =>{
    const token = getQueryString("token");
    if (token){
      localStorage.setItem("token", token);
    }
  };

  useEffect(()=>{
    getProdList();
    getToken();
  }, []);

  return <div className={styles.home_page}>
    <SearchBar></SearchBar>
    <div className={styles.sort_wrap}>
      <SortBy></SortBy>
    </div>
    <div className={styles.grid_container}>
      {
        prodList && prodList.map(item=>{
          return <HomeCard item={item}></HomeCard>;
        })
      }
    </div>
  </div>;
};

export default Home;
