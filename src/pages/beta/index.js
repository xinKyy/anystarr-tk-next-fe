import styles from '../../components/Home/home.module.scss';
import {useEffect, useRef, useState} from "react";
import SearchBar from "@/components/SearchBar";
import HomeCard from "@/components/HomeCard";
import SortBy from "@/components/SoryBy";
import {APIGetProductList} from "@/api";

let data = [];

const Home = () => {
  const [prodList, setProdList] = useState(data);
  const [sort, setSort] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 记录是否还有更多数据

  const scrollDiv = useRef();

  const getProdList = (searchNameRe) => {
    if (loading || !hasMore) return; // 检查是否正在加载或没有更多数据

    let nowPage = searchNameRe ? 1 : page;

    setLoading(true);
    APIGetProductList(JSON.stringify({
      sort: sort,
      page: nowPage,
      pageSize: 100,
      searchName:searchNameRe
    })).then(resp => {
      if (resp.data.list) {
        if ( nowPage === 1){
          data = resp.data.list.records;
        } else {
          data = prodList.concat(resp.data.list.records);
        }
        setProdList(data);
        setHasMore(data.length > 0); // 更新是否还有更多数据
      }
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    getProdList();
  }, [sort, page]);

  const onSortChange = (sortby) => {
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

  const onSearch = (v) =>{
    setPage(1);
    getProdList(v);
  };

  return (
    <div style={{
      width:"100vw"
    }}>
      <div ref={scrollDiv} className={styles.home_page}>
        <SearchBar onChange={onSearch} />
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
    </div>
  );
};

export default Home;
