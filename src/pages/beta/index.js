import styles from '../../components/Home/home.module.scss';
import {useEffect, useRef, useState} from "react";
import dynamic from "next/dynamic";
import SearchDropDown from "@/components/SearchDropDown";
import HomeCard from "@/components/HomeCard";
import SortBy from "@/components/SoryBy";
import {Select, Option, Popover} from 'antd';
import { prodListMock } from '@/constants/Product';
import {APIGetCategoryFirst, APIGetCategorySecond, APIGetProductList} from "@/api";
import CategoryList from "@/components/CategoryList";
import Category2List from "@/components/Category2List";
import SizeBox from "@/components/SizeBox";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import CategoryTreeSelect from "@/components/TreeSelect";
import {getQueryString, isMobile} from "@/utils/action";
import CustomEmpty from '@/components/CustomEmpty';
const SearchBar = dynamic(() => import("@/components/SearchBar"), {
  ssr: false, // 如果组件只在客户端渲染，可以设置为 false
  loading: () => <></>, // 可选：提供一个加载状态
});
let data = [];
let category1IdRef;
let pageRef = 1;
const Home = () => {
  const [prodList, setProdList] = useState(data);
  const [sort, setSort] = useState(5);
  const [sortType, setSortType] = useState();
  const [category1Id, setCategory1Id] = useState(category1IdRef);
  const [page, setPage] = useState(pageRef);
  const [commissionType, setCommissionType] = useState(0);
  const [earnPerType, setEarnPerType] = useState(0);


  const [visibleDropDown, setVisibleDropDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [random, setRandom] = useState(1);
  const [hasMore, setHasMore] = useState(true); // 记录是否还有更多数据
  const scrollDiv = useRef();
  const searchNameRef = useRef();
  const searchNameTypeRef = useRef(2);

  const historyRef = useRef(false);

  const getProdList = (searchNameRe, searchType, searchSort) => {
    // setProdList(prodListMock);
    // if (loading) return; // 检查是否正在加载或没有更多数据

    let nowPage = searchNameRe ? 1 : page;

    if (searchNameRe){
      setLoading(true);
    } else {
      setPageLoading(true);
    }
    APIGetProductList(JSON.stringify({
      sort: searchSort ?? sort,
      sortType: sortType,
      page: nowPage,
      pageSize: 40,
      searchName:searchNameRef.current,
      searchType: searchType,
      commissionType: commissionType,
      earnPerType: earnPerType,
      categoryId:category1IdRef
    })).then(resp => {
      if (resp.data.list) {
        if ( nowPage === 1){
          data = resp.data.list.records;
        } else {
          data = prodList.slice().concat(resp.data.list.records);
        }
        setProdList(data.slice());
      }
    }).finally(() => {
      setLoading(false);
      setPageLoading(false);
    }).catch(e=>{
      setPageLoading(false);
      setLoading(false);
    });
  };

  useEffect(() => {
    const back = localStorage.getItem("toProductDetails");
    if (back === "1"){
      setTimeout(()=>{
        localStorage.setItem("toProductDetails", "0");
      }, 300);
      return;
    }
    getProdList();
  }, [sort, page, category1Id, random, sortType, commissionType, earnPerType]);

  const onSortChange = (sortby, sortType) => {
    setSortType(sortType);
    if (sortby !== -1){
      localStorage.setItem("mySort", `${sortby}`);
    }
    if (sortby === 5){
      setRandom(random + 1);
    }
    if (sort === sortby){
      setSort(sort);
      setPage(1); // Reset page when sorting
      pageRef = 1;
      setHasMore(true); // 重置是否还有更多数据
    } else {
      setSort(sortby);
      setPage(1); // Reset page when sorting
      pageRef = 1;
      setHasMore(true); // 重置是否还有更多数据
    }
  };

  const handleScroll = () => {
    if (loading || !hasMore) return;
    const nearBottom = window.innerHeight + document.documentElement.scrollTop >= scrollDiv.current?.offsetHeight - 50;
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
  }, [loading, pageLoading]);

  const onSearch = (v, searchType) =>{
    setPage(1);
    pageRef = 1;
    searchNameRef.current = v;
    searchNameTypeRef.current = searchType;
    getProdList(v, searchType, 2);

    if (!v) return;
    const item = {name:v, type:searchType};
    let localHistory = localStorage.getItem("history");
    if (localHistory){
      localHistory = JSON.parse(localHistory);
    } else {
      localHistory = [];
    }
    if (localHistory && localHistory.filter(it => it.name === item.name).length === 0){
     localHistory.unshift(item);
    }

    localHistory = localHistory.length > 5 ? localHistory.slice(0, 5) : localHistory;
    localStorage.setItem("history", JSON.stringify(localHistory));
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

  // 搜索狂选中
  const onSelected = (fieldName, index) => {
    if (fieldName === 'commissionType') {
      setCommissionType(index);
    } else {
      setEarnPerType(index);
    }
  };

  useEffect(()=>{
    const sortt = localStorage.getItem("mySort");
    setSort(Number(sortt ?? "5"));
  }, []);

  // 下拉框数据
  const select_data = [
  {
    placeholder: 'Commission rate',
    fieldName: 'commissionType',
    list: [{
      value: 1,
      label: '< 15%',
    },
    {
      value: 2,
      label: '15% - 20%',
    },
    {
      value: 3,
      label: '20% - 25%',
    },
    {
      value: 4,
      label: '25% - 30%',
    },
     {
      value: 5,
      label: '> 30%',
      }
    ]
  },
  {
    placeholder: 'Earn per sale',
    fieldName: 'earnPerType',
    list: [{
      value: 1,
      label: '<$3',
    },
    {
      value: 2,
      label: '$3 - $5',
      },
      {
      value: 3,
      label: '$5 - $10',
    },
     {
      value: 4,
      label: '$10 - $20',
      },
      {
      value: 5,
      label: '>$20',
    },
  ]
  }];


  return (
    <div style={{
      width:"100vw"
    }}>
      <div  onFocus={()=>setVisibleDropDown(false)} ref={scrollDiv} className={styles.home_page}>
        <div className={styles.mobile_wrap}>
          {/* {
            // !mobile &&
            // <CategoryTreeSelect category1Id={category1Id} className={styles.select_category} onCategoryChange={onCheckLevel1}></CategoryTreeSelect>
          } */}
          <div className={styles.select_area}>
            <div className={styles.select_area_item}>
              <CategoryTreeSelect categor2y1Id={category1Id} className={styles.select_category} onCategoryChange={onCheckLevel1}></CategoryTreeSelect>
              {select_data.map((dataSet, index) => (
              <Select allowClear onChange={(value) => onSelected(dataSet.fieldName, value)} placeholder={dataSet.placeholder} key={index} style={{ width: 200, borderRadius: 30 }} dropdownStyle={{border: '1px solid #FC883A', textAlign: 'center',  }} >
                    {dataSet.list.map((item) => (

                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                ))}
            </div>
          </div>

           <div>
            <SearchBar searchNameRef={searchNameRef.current} searchNameTypeRef={searchNameTypeRef.current} loading={loading} onChange={onSearch} />
           </div>


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
        }} spinning={pageLoading} indicator={
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
            {
              prodList.length === 0 && <CustomEmpty result={searchNameRef.current}/>
            }
        </Spin>
        <SizeBox h={200}></SizeBox>
      </div>
    </div>
  );
};

export default Home;
