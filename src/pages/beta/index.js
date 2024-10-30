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
import CategoryTreeSelect from "@/components/TreeSelect";
import {isMobile} from "@/utils/action";
let data = [];
let category1IdRef;
let pageRef = 1;
let back = false;
let searchNameRef = "";
let searchNameTypeRef = 1;
const Home = () => {
  const [prodList, setProdList] = useState(data);
  const [sort, setSort] = useState(1);
  const [category1Id, setCategory1Id] = useState(category1IdRef);
  const [page, setPage] = useState(pageRef);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 记录是否还有更多数据
  const scrollDiv = useRef();

  const getProdList = (searchNameRe, searchType) => {
    if (loading) return; // 检查是否正在加载或没有更多数据

    searchNameRef = searchNameRe;
    searchNameTypeRef = searchType;

    let nowPage = searchNameRe ? 1 : page;

    setLoading(true);
    APIGetProductList(JSON.stringify({
      sort: Number(localStorage.getItem("mySort") ?? "1"),
      page: nowPage,
      pageSize: 100,
      searchName:searchNameRef,
      searchType:searchNameTypeRef,
      categoryId:category1IdRef
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
    if (back){
      back = false;
      return;
    }
    getProdList();
  }, [sort, page, category1Id]);

  const onSortChange = (sortby) => {
    setSort(sortby);
    localStorage.setItem("mySort", sortby);
    setPage(1); // Reset page when sorting
    pageRef = 1;
    setHasMore(true); // 重置是否还有更多数据
  };

  const handleScroll = () => {
    if (loading || !hasMore) return;
    const nearBottom = window.innerHeight + document.documentElement.scrollTop >= scrollDiv.current?.offsetHeight - 100;
    if (nearBottom) {
      pageRef = page + 1;
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
    pageRef = 1;
    getProdList(v, searchType);
  };

  const onCheckLevel1 = (v) =>{
    pageRef = 1;
    setPage(1);
    if (v === category1Id) {
      setCategory1Id(null);
      category1IdRef = null;
      return;
    }
    setCategory1Id(v);
    category1IdRef = v;
  };

  useEffect(()=>{
    setSort(Number(localStorage.getItem("mySort") ?? "1"));
  }, []);

  return (
    <div style={{
      width:"100vw"
    }}>
      <div ref={scrollDiv} className={styles.home_page}>
        <div className={styles.mobile_wrap}>
          {
            // !mobile &&
            <CategoryTreeSelect category1Id={category1Id} className={styles.select_category} onCategoryChange={onCheckLevel1}></CategoryTreeSelect>
          }
          <SearchBar searchNameRef={searchNameRef} searchNameTypeRef={searchNameTypeRef} loading={loading} onChange={onSearch} />
        </div>
        <div className={styles.sort_wrap}>
          <SortBy current={sort} onChange={onSortChange} />
        </div>

        {
          // mobile && <CategoryList onCheckLevel1={onCheckLevel1} currentCategoryId={category1Id}></CategoryList>
        }
        {
          // mobile && category2List && category2List.length  > 0 && <>
          //   <SizeBox h={20}></SizeBox>
          //   <Category2List onCheckLevel2={onCheckLevel2} category2List={category2List} currentCategoryId={category2Id}></Category2List>
          // </>
        }

        {
          // mobile && category3List && category3List.length  > 0 && <>
          //   <SizeBox h={20}></SizeBox>
          //   <Category2List onCheckLevel2={onCheckLevel3} category2List={category3List} currentCategoryId={category3Id}></Category2List>
          //   <SizeBox h={20}></SizeBox>
          // </>
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
                <div onClick={()=>{
                  back = true;
                }}>
                  <HomeCard key={item.productId} item={item} />
                </div>
              ))
            }
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default Home;
