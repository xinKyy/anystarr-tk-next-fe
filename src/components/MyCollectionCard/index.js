import React, {useState} from 'react';
import styles from './index.module.scss';
import SizeBox from "@/components/SizeBox";
import {useRouter} from "next/router";
import {isMobile} from "@/utils/action";
import copy from "copy-to-clipboard";
import {message} from "antd";
import {APIAddFavoriteItems, APIDeleteFavoriteItems} from "@/api";
import {useSelector} from "react-redux";
import ConnectTikTipsModal from "@/components/connectTikTipsModal";
import useLogin from "@/hooks/useLogin"; // 假设你将 SCSS 文件命名为 YourStyles.module.scss
function updateImageUrl(url, w, h) {
  if (!url) return "";
  return url.replace(/(\d+):(\d+)/, `${w}:${h}`);
}
const MyCollectionCard = ({item, fromMyLike, checkItem, checked}) => {

  const router = useRouter();
  const [collected, setCollected] = useState(item.collect);
  const { needLogin } = useLogin();
  const userInfo = useSelector(state => state.home.userInfo.userInfo);
  const [showConnectTips, setShowConnectTips] = useState(false);

  const toDetails = () =>{
    router.push(`/product/${item.productId}`);
  };

  const convertPrice = (price) =>{
    if (price && price.indexOf("-") !== -1){
       return price.split("-")[0];
    }
    return price;
  };

  const toAddTk = (e) =>{
    e.stopPropagation();

    if (needLogin){
      setShowConnectTips(true);
      return;
    }

    if (item?.url){
      if (isMobile()){
        window.open(item?.url, "_blank");
      } else {
        copy(item?.url);
        message.success("Copy link successfully, please open it with a browser on your mobile device");
      }
    }

  };

  const addCollect = () =>{
    let user = localStorage.getItem("user");
    if (user){
      user = JSON.parse(user);
      APIAddFavoriteItems({
        uid:user.id,
        itemId:item.productId
      }).then(resp=>{
        if (resp){
          console.log("收藏成功");
        }
      });
    }
  };

  const removeCollect = () =>{
    let user = localStorage.getItem("user");
    if (user){
      user = JSON.parse(user);
      APIDeleteFavoriteItems({
        uid:user.id,
        itemId:item.productId
      }).then(resp=>{
        if (resp){
          console.log("取消收藏成功");
        }
      });
    }
  };


  const collect = (e) =>{
    e.stopPropagation();
    if (needLogin){
      setShowConnectTips(true);
      return;
    }
    if (!collected){
      addCollect();
      setCollected(true);
    } else {
      removeCollect();
      setCollected(false);
    }
  };


  return (
    <div className={`${styles.flex_center} ${styles.collection_card}`}>
      <div onClick={toDetails} className={styles.flexContainer}>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.content}>
          <img
            src={ item.alyImage ? item.alyImage : updateImageUrl(item.image, 500, 500)}
            alt='Image'
          />
          <div>
            <div className={styles.normal_wrap}>Price</div>
            <div className={styles.price}>{item.price}</div>
          </div>

          <div style={{
            flex:1,
            justifyContent:"flex-end"
          }} className={`${styles.flex_center} ${styles.zoom_in_mobile}`}>
            <div className={styles.flex_column_center}>
              <div>Tiktok</div>
              <div className={styles.normal_wrap}>Commission</div>
              <div style={{color:"#000"}} className={styles.price}>{item.openRate}%</div>
            </div>
            <SizeBox w={20}></SizeBox>
            <div style={{
              color:"#f34949",
              fontWeight:"bold",
              fontSize:"30px"
            }}>VS</div>
            <SizeBox w={20}></SizeBox>
            <div className={styles.flex_column_center}>
              <div>anyStarr</div>
              <div className={styles.normal_wrap}>Commission</div>
              <div className={styles.price}>{item.finishRate}%</div>
            </div>
          </div>

          {/* <span className={styles.commission}>Commission ¥20</span>*/}
        </div>

        <div className={styles.sold}>Sold {item.soldNum}</div>
        <div>
          {
            fromMyLike && <div onClick={(e)=>{
              e.stopPropagation();
              checkItem(item.productId);
            }} className={`${styles.select_icon} ${checked ? styles.active : ""}`}>

            </div>
          }
        </div>

        <div className={styles.iconContainer}>
          <i className={`icon-class ${styles.icon}`}></i>
        </div>

        <div onClick={collect} className={ collected ? styles.stared_img : styles.star_img}></div>

        {
          showConnectTips && <ConnectTikTipsModal show={showConnectTips} onCancel={()=>setShowConnectTips(false)}></ConnectTikTipsModal>
        }
      </div>
    </div>
  );
};

export default MyCollectionCard;
