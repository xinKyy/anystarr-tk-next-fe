import styles from '../components/Home/home.module.scss';
import {Button, Drawer, message, Progress, Slider} from "antd";
import {useEffect, useRef, useState} from "react";
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

let data = [

];

const Home = () => {
  const [prodList, setProdList] = useState([  {
    title:"11"
  }]);
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 记录是否还有更多数据

  const scrollDiv = useRef();

  const getProdList = () => {
    if (loading || !hasMore) return; // 检查是否正在加载或没有更多数据
    setLoading(true);
    APIGetProductList(JSON.stringify({
      sort: sort,
      page: page,
      pageSize: 100
    })).then(resp => {
      if (resp.data.list) {
        let newData = [];
        if ( page === 1){
          newData = resp.data.list.records;
        } else {
          newData = prodList.concat(resp.data.list.records);
        }
        let data = newData;
        setProdList(data);
        setHasMore(newData.length > 0); // 更新是否还有更多数据
      }
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    getProdList();
  }, [sort, page]);

  const onSortChange = (sortby) => {
    if (loading) return;
    setSort(sortby);
    setPage(1); // Reset page when sorting
    setHasMore(true); // 重置是否还有更多数据
  };

  const handleScroll = () => {
    if (loading || !hasMore) return;
    const nearBottom = window.innerHeight + document.documentElement.scrollTop >= scrollDiv.current.offsetHeight - 100;
    if (nearBottom) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <div ref={scrollDiv} className={styles.home_page}>
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
