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

const Home = () => {
  const [prodList, setProdList] = useState(data);
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getProdList = () => {
    if (loading) return;
    setLoading(true);
    APIGetProductList(JSON.stringify({
      sort: sort,
      page: page,
      pageSize: 100
    })).then(resp => {
      if (resp) {
        const newData = resp.data.list.records;
        setProdList(prevProdList => (page === 1 ? newData : [...prevProdList, ...newData]));
        data = newData;
      }
    }).finally(() => {
      setLoading(false);
    });
  };

  const getToken = () => {
    const token = getQueryString("token");
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  useEffect(() => {
    getProdList();
  }, [sort, page]);

  useEffect(() => {
    getToken();
  }, []);

  const onSortChange = (sortby) => {
    if (loading) return;
    setSort(sortby);
    setPage(1); // Reset page when sorting
  };

  const handleScroll = () => {
    if (loading) return;

    // Check if user has scrolled to the bottom of the page
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <div className={styles.home_page}>
      <SearchBar />
      <div className={styles.sort_wrap}>
        <SortBy current={sort} onChange={onSortChange} />
      </div>
      <div className={styles.grid_container}>
        {
          prodList && prodList.map(item => (
            <HomeCard key={item.productId} item={item} />
          ))
        }
      </div>
    </div>
  );
};

export default Home;
