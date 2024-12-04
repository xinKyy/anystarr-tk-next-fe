import styles from "./index.module.scss";
import {Avatar} from "antd";
import SizeBox from "@/components/SizeBox";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import HomeCard from "@/components/HomeCard";
import {APIGetRecommendList} from "@/api";
import {isMobile} from "@/utils/action";
import dynamic from 'next/dynamic';
import BackBtn from "@/components/BackBtn";
const CreateLinkModal = dynamic(() => import('@/components/CreateLinkModal'), {
  ssr: false,  // Disable SSR for this component
});
const PersonCenter = () =>{
  const userInfo = useSelector(state => state.home.userInfo.userInfo);
  const [mobile, setMobile] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [recommendList, setRecommendList] = useState([]);
  const [currentExt, setCurrentExt] = useState("");
  useEffect(()=>{

    setMobile(isMobile());

    APIGetRecommendList().then(resp=>{
      if (resp.data.list){
        setRecommendList(resp.data.list);
      }
    });
  }, []);

  const toAddTk = () =>{
    setShowCreate(true);
  };

  return <div className={styles.person_center}>
    <div className={styles.back_wrap}>
      <BackBtn></BackBtn>
    </div>
    {
      showCreate && <CreateLinkModal pidArr={recommendList.map(item=>item.productId)} show={showCreate} onCancel={()=>setShowCreate(false)}></CreateLinkModal>
    }

    <div className={styles.bg_wrap}></div>
    <div className={styles.avatar_wrap}>
      <Avatar className={styles.avatar} size={mobile ? 80 : 100} src={userInfo?.avatarUrl}></Avatar>
    </div>
    <div className={styles.nick_name}>
      {userInfo?.displayName}
    </div>
    <div className={styles.info_wrap}>
      <div className={styles.info_item}>
        <div className={styles.num}>{userInfo?.followerCount}</div>
        <div className={styles.des}>Follower</div>
      </div>
      <SizeBox w={20}></SizeBox>
      <div className={styles.info_item}>
        <div className={styles.num}>{userInfo?.likesCount}</div>
        <div className={styles.des}>Likes</div>
      </div>
    </div>
    <SizeBox h={20}></SizeBox>
   <div className={styles.section_wrap}>
     <div className={styles.title_1}>
       Based on your Showcase data, you may be interested in the following items
     </div>
     <div className={styles.title_1}>
       All interested ? <span onClick={toAddTk}>Add to showcase</span>
     </div>
     <div className={styles.grid_container}>
       {
         recommendList && recommendList.map(item=>{
           return <HomeCard currentExt={currentExt} setCurrentExt={setCurrentExt}  item={item}></HomeCard>;
         })
       }
     </div>
     <SizeBox h={50}></SizeBox>
   </div>
  </div>;
};

export default PersonCenter;
