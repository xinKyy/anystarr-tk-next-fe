import styles from '../../components/Home/home.module.scss';
import {useEffect, useRef, useState} from "react";
import SearchBar from "@/components/SearchBar";
import SearchDropDown from "@/components/SearchDropDown";
import HomeCard from "@/components/HomeCard";
import SortBy from "@/components/SoryBy";
import { Select, Option } from 'antd';
import { prodListMock } from '@/constants/Product';
import {APIGetCategoryFirst, APIGetCategorySecond, APIGetProductList} from "@/api";
import CategoryList from "@/components/CategoryList";
import Category2List from "@/components/Category2List";
import SizeBox from "@/components/SizeBox";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import CategoryTreeSelect from "@/components/TreeSelect";
import {isMobile} from "@/utils/action";
import CustomEmpty from '@/components/CustomEmpty';
import { set } from 'core-js/core/dict';
let data = [];
let category1IdRef;
let pageRef = 1;
let back = false;
const Home = () => {
  const [prodList, setProdList] = useState(data);
  const [sort, setSort] = useState(5);
  const [category1Id, setCategory1Id] = useState(category1IdRef);
  const [page, setPage] = useState(pageRef);
  const [commissionType, setCommissionType] = useState(0);
  const [earnPerType, setEarnPerType] = useState(0);


  const [visibleDropDown, setVisibleDropDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [random, setRandom] = useState(1);
  const [hasMore, setHasMore] = useState(true); // 记录是否还有更多数据
  const scrollDiv = useRef();
  const searchNameRef = useRef();
  const searchNameTypeRef = useRef(2);

  const historyRef = useRef(false);

  const getProdList = (searchNameRe, searchType) => {
    // setProdList(prodListMock);
    if (loading) return; // 检查是否正在加载或没有更多数据

    let nowPage = searchNameRe ? 1 : page;

    setLoading(true);
    APIGetProductList(JSON.stringify({
      sort: Number(localStorage.getItem("mySort") ?? "1"),
      page: nowPage,
      pageSize: 100,
      searchName:searchNameRef.current,
      searchType: searchNameTypeRef.current,
      commissionType: commissionType,
      earnPerType: earnPerType,
      categoryId:category1IdRef
    })).then(resp => {
      if (resp.data.list) {
        if ( nowPage === 1){
          data = resp.data.list.records;
        } else {
          data = prodList.concat(resp.data.list.records);
        }
        setProdList(data.filter(item => {
          if (!item.lyImage && !item.alyImages && !item.images && !item.image){
            return false;
          }
          return true;
        }));
      }
    }).finally(() => {
      setLoading(false);
    }).catch(e=>{
      setLoading(false);
    });
  };

  useEffect(() => {
    const back = localStorage.getItem("toProductDetails");
    if (back === "1"){
      localStorage.setItem("toProductDetails", "0");
      return;
    }
    getProdList();
  }, [sort, page, category1Id, random]);

  const onSortChange = (sortby) => {
    window.gtag && window.gtag('event', 'sort', {
      'event_category': 'sort',
      'event_label': 'sort',
      'value': sortby,
    });
    if (sort === sortby){
      setSort(5);
      setPage(1); // Reset page when sorting
      pageRef = 1;
      localStorage.setItem("mySort", 5);
      setHasMore(true); // 重置是否还有更多数据
    } else {
      setSort(sortby);
      if (sortby === 5){
        setRandom(random + 1);
      }
      localStorage.setItem("mySort", sortby);
      setPage(1); // Reset page when sorting
      pageRef = 1;
      setHasMore(true); // 重置是否还有更多数据
    }
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
    searchNameRef.current = v;
    searchNameTypeRef.current = searchType;
    getProdList(v, searchType);

    if (!v) return;
    const item = {name:v, type:searchType};
    let localHistory = localStorage.getItem("history");
    if (localHistory){
      localHistory = JSON.parse(localHistory);
    } else {
      localHistory = [];
    }
    if (localHistory && localHistory.filter(it => it.name === item.name).length === 0){
     localHistory.push(item);
    }
    localStorage.setItem("history", JSON.stringify(localHistory));
    showVisibleDropDown(true);
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

  const showVisibleDropDown = (bool) => {
    // 取反
    if (bool === false && historyRef.current === false){
      setVisibleDropDown(false);
    } else {
      setVisibleDropDown(true);
    }
  };

  // 搜索狂选中
  const onSelected = (fieldName, index) => {
    console.log(fieldName, index);
    if (fieldName === 'commissionType') {
      setCommissionType(index);
    } else {
      setEarnPerType(index);
    }
  };

  useEffect(()=>{
    setSort(Number(localStorage.getItem("mySort") ?? "5"));
  }, []);

  // 下拉框数据
  const select_data = [{
    placeholder: 'Select category',
    list: [{
      value: 1,
      label: 'Product Name',
    },
    {
      value: 2,
      label: 'Product Code',
    },
    {
      value: 3,
      label: 'Product Description',

    }
  ]
  },
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
      label: '25% - 30%',

    },
     {
      value: 4,
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
      <div ref={scrollDiv} className={styles.home_page}>
        <div className={styles.mobile_wrap}>
          {/* {
            // !mobile &&
            // <CategoryTreeSelect category1Id={category1Id} className={styles.select_category} onCategoryChange={onCheckLevel1}></CategoryTreeSelect>
          } */}
          {/* <CategoryTreeSelect categor2y1Id={category1Id} className={styles.select_category} onCategoryChange={onCheckLevel1}></CategoryTreeSelect> */}
          <div className={styles.select_area}>
            <div className={styles.select_area_item}>
            {select_data.map((dataSet, index) => (
              <Select onChange={(value) => onSelected(dataSet.fieldName, value)} placeholder={dataSet.placeholder} key={index} style={{ width: 200, borderRadius: 30 }} dropdownStyle={{border: '1px solid #FC883A', textAlign: 'center',  }} >
                    {dataSet.list.map((item) => (

                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                ))}
            </div>
          </div>
          {
            visibleDropDown && <div onFocus={()=>showVisibleDropDown(true)}>
              <SearchDropDown hover={()=>{ historyRef.current = true; }} show={()=>showVisibleDropDown(true)} noHover={()=>{ historyRef.current = false; }} onSearch={(e, item)=>onSearch(item.name, item.type)} />
            </div>
          }

          <div onFocus={()=>showVisibleDropDown(true)} onBlur={()=>showVisibleDropDown(false)}>
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
            {
              prodList.length === 0 && <CustomEmpty result={searchNameRef.current}/>
            }
        </Spin>
      </div>
    </div>
  );
};

export default Home;
