import styles from "./index.module.scss";
import HomeCard from "@/components/HomeCard";
import {useEffect, useRef, useState} from "react";
import {APIGetLikeProductList, APIGetProductList} from "@/api";
import BackBtn from "@/components/BackBtn";
import {useSelector} from "react-redux";

const MyLike = () =>{
  let data = [];
  const [prodList, setProdList] = useState(data);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 记录是否还有更多数据
  const scrollDiv = useRef();

  const getProdList = () => {
    if (loading || !hasMore) return; // 检查是否正在加载或没有更多数据
    setLoading(true);
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo){
      userInfo = JSON.parse(userInfo);
      APIGetLikeProductList(JSON.stringify({
        page: page,
        pageSize: 100000,
        uid:userInfo?.id
      })).then(resp => {
        if (resp.data.result) {
          const newData = resp.data.result;
          newData.forEach(item=>{
            item.collect = true;
          });
          setProdList(prevProdList => (page === 1 ? newData : [...prevProdList, ...newData]));
          setHasMore(newData.length > 0); // 更新是否还有更多数据
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  useEffect(()=>{
    getProdList();
  }, []);


  const handleScroll = () => {
    if (loading || !hasMore) return;
    const nearBottom = window.innerHeight + document.documentElement.scrollTop >= scrollDiv.current.offsetHeight - 100;
    if (nearBottom) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    // window.addEventListener('scroll', handleScroll);
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
  }, [loading]);

  return <div className={styles.my_like_page} ref={scrollDiv}>
    <div style={{
      marginLeft:"10px"
    }}>
      <BackBtn/>
    </div>
    {
      prodList && prodList.length > 0 ? <div className={styles.grid_container}>
        {
          prodList.map(item => (
            <HomeCard key={item.productId} item={item} />
          ))
        }
      </div> : <div className={styles.no_data}>
        <img src={"/no_data.svg"} />
        No data
      </div>
    }
  </div>;
};

export default MyLike;
