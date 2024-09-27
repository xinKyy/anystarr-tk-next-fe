
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

const Home = ( ) =>{

  const [prodList, setProdList] = useState([{
    price:"$90",
    title:"hahah",
    image:"https://p19-oec-ttp.tiktokcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/671058679dac4cb6a2deb499a21d58e5~tplv-omjb5zjo8w-resize-jpeg:2000:2000.jpeg?from=520841845",
    soldNum:"99+"
  }]);

  const getProdList = () =>{
    APIGetProductList(JSON.stringify({
      sort: 1,
      page: 1,
      pageSize: 100
    })).then(resp=>{
      if (resp){
        setProdList(resp.data.list.records);
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
