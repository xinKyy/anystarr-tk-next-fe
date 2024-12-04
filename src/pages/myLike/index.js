import styles from "./index.module.scss";
import HomeCard from "@/components/HomeCard";
import {useEffect, useRef, useState} from "react";
import {APIGetLikeProductList, APIGetProductList} from "@/api";
import BackBtn from "@/components/BackBtn";
import MyCollectionCard from "@/components/MyCollectionCard";
import CreateLinkModal from "@/components/CreateLinkModal";
import {LoadingOutlined} from "@ant-design/icons";
let data = [];
const MyLike = () =>{
  const [prodList, setProdList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 记录是否还有更多数据
  const [grid, setGrid] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [currentExt, setCurrentExt] = useState("");
  const [checkPids, setCheckPids] = useState([]);

  const scrollDiv = useRef();

  const getProdList = () => {
    let userInfo = localStorage.getItem("user");
    if (userInfo){
      userInfo = JSON.parse(userInfo);
      APIGetLikeProductList(JSON.stringify({
        page: page,
        pageSize: 100,
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
  }, [loading]);

  useEffect(() => {
    // window.addEventListener('scroll', handleScroll);
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
  }, [loading]);

  const toAddTk = () =>{
    setShowCreate(true);
  };

  const checkItem = (pid) =>{
    if (checkPids.includes(pid)){
     const newArr = checkPids.filter(item=>item !== pid);
     setCheckPids(newArr);
     return;
    }
    checkPids.push(pid);
    setCheckPids(checkPids.slice());
  };

  return <div className={styles.my_like_page} ref={scrollDiv}>
    <div style={{
      marginLeft:"10px",
      display:"flex",
      justifyContent:"space-between"
    }}>
      <BackBtn/>
      {
        showCreate && <CreateLinkModal pidArr={checkPids} show={showCreate} onCancel={()=>setShowCreate(false)}></CreateLinkModal>
      }
      <div style={{
        marginLeft:"10px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}>
        {/* <img style={{*/}
        {/*  width:"20px",*/}
        {/*  height:"20px",*/}
        {/*  cursor:"pointer",*/}
        {/*  marginRight:"10px"*/}
        {/* }} onClick={()=>setGrid(!grid)} src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/convert_icon.svg"} />*/}

        <div onClick={toAddTk} className={styles.add_to_showcase}>
          Add to Showcase
        </div>
      </div>
    </div>
    {
      prodList && prodList.length > 0 ? <div>
        {
          grid ? <div className={styles.grid_container}>
            {
              prodList.map(item => (
                <HomeCard currentExt={currentExt} setCurrentExt={setCurrentExt} fromMyLike={true} key={item.productId} checkItem={checkItem} item={item} checked={checkPids?.includes(item.productId)} />
              ))
            }
          </div> : <div>
            {
              prodList.map(item => (
                <MyCollectionCard fromMyLike={true} key={item.productId} item={item} checkItem={checkItem} checked={checkPids?.includes(item.productId)} />
              ))
            }
          </div>
        }
      </div> : <div className={styles.no_data}>
        <img src={"/no_data.svg"} />
        No data
      </div>
    }
  </div>;
};

export default MyLike;
