import styles from "./index.module.scss";
import {Avatar} from "antd";
import SizeBox from "@/components/SizeBox";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import HomeCard from "@/components/HomeCard";
import {APIGetRecommendList} from "@/api";

const PersonCenter = () =>{
  const userInfo = useSelector(state => state.home.userInfo.userInfo);

  const [recommendList, setRecommendList] = useState([]);

  useEffect(()=>{
    APIGetRecommendList().then(resp=>{

    });
  }, []);


  return <div className={styles.person_center}>
    <div className={styles.bg_wrap}></div>
    <div className={styles.avatar_wrap}>
      <Avatar className={styles.avatar} size={100} src={userInfo?.avatarUrl}></Avatar>
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

   <div className={styles.section_wrap}>
     <div className={styles.title_1}>
       Based on your Showcase data, you may be interested in the following items
     </div>
     <div className={styles.title_1}>
       All interested ? <span>Add to showcase</span>
     </div>
     <div>
       {/* <HomeCard item={}></HomeCard>*/}
     </div>
   </div>
  </div>;
};

export default PersonCenter;
