import styles from '../../components/Home/home.module.scss';
import {useEffect, useRef, useState} from "react";
import SearchBar from "@/components/SearchBar";
import HomeCard from "@/components/HomeCard";
import SortBy from "@/components/SoryBy";
import {APIGetCategoryFirst, APIGetCategorySecond, APIGetProductList} from "@/api";
import CategoryList from "@/components/CategoryList";
import Category2List from "@/components/Category2List";
import SizeBox from "@/components/SizeBox";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
let data = [];
const Home = () => {
  const [prodList, setProdList] = useState(data);
  const [sort, setSort] = useState(1);
  const [category1Id, setCategory1Id] = useState();
  const [category2Id, setCategory2Id] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 记录是否还有更多数据
  const [category2List, setCategory2List] = useState([]);

  const scrollDiv = useRef();

  const getProdList = (searchNameRe, searchType) => {
    if (loading) return; // 检查是否正在加载或没有更多数据

    let nowPage = searchNameRe ? 1 : page;

    setLoading(true);
    APIGetProductList(JSON.stringify({
      sort: sort,
      page: nowPage,
      pageSize: 100,
      searchName:searchNameRe,
      searchType:searchType,
      categoryId:category2Id || category1Id
    })).then(resp => {
      if (resp.data.list) {
        if ( nowPage === 1){
          data = resp.data.list.records;
        } else {
          data = prodList.concat(resp.data.list.records);
        }
        setProdList(data);
      }
    }).finally(() => {
      setLoading(false);
    }).catch(e=>{
      setLoading(false);
    });
  };

  useEffect(() => {
    getProdList();
  }, [sort, page, category1Id, category2Id]);

  const onSortChange = (sortby) => {
    setSort(sortby);
    setPage(1); // Reset page when sorting
    setHasMore(true); // 重置是否还有更多数据
  };

  const handleScroll = () => {
    if (loading || !hasMore) return;
    const nearBottom = window.innerHeight + document.documentElement.scrollTop >= scrollDiv.current?.offsetHeight - 100;
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

  const onSearch = (v, searchType) =>{
    setPage(1);
    getProdList(v, searchType);
  };

  const onCheckLevel1 = (v) =>{
    if (v === category1Id) {
      setCategory1Id(null);
      return;
    }
    setCategory1Id(v);
  };

  const onCheckLevel2 = (v) =>{
    if (v === category2Id) {
      setCategory2Id(null);
      return;
    }
    setCategory2Id(v);
  };

  const getLevel2ListBy1Id = () =>{
    if (!category1Id) return;
    APIGetCategorySecond({
      parentId:category1Id,
    }).then(resp=>{
      if (resp.data.result){
        setCategory2List(resp.data.result);
      }
    });
  };

  useEffect(()=>{
    getLevel2ListBy1Id();
  }, [category1Id]);

  return (
    <div style={{
      width:"100vw"
    }}>
      <div ref={scrollDiv} className={styles.home_page}>
        <SearchBar loading={loading} onChange={onSearch} />
        <div className={styles.sort_wrap}>
          <SortBy current={sort} onChange={onSortChange} />
        </div>

         <CategoryList onCheckLevel1={onCheckLevel1} currentCategoryId={category1Id}></CategoryList>

        {
          category2List && category2List.length  > 0 && <>
            <SizeBox h={20}></SizeBox>
            <Category2List onCheckLevel2={onCheckLevel2} category2List={category2List} currentCategoryId={category2Id}></Category2List>
            <SizeBox h={20}></SizeBox>
          </>
        }

        <Spin style={{
          width:"100%"
        }} spinning={loading} indicator={
          <LoadingOutlined
            style={{
              fontSize: 48,
            }}
            spin
          />} >
          <div className={styles.grid_container}>
            {
              prodList && prodList.map(item => (
                <HomeCard key={item.productId} item={item} />
              ))
            }
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default Home;
