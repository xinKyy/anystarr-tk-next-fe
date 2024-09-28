import React from 'react';
import styles from './index.module.scss';
import SizeBox from "@/components/SizeBox";
import {useRouter} from "next/router";
import {isMobile} from "@/utils/action";
import copy from "copy-to-clipboard";
import {message} from "antd"; // 假设你将 SCSS 文件命名为 YourStyles.module.scss

const HomeCard = ({item}) => {

  const router = useRouter();


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

    if (item?.url){
      if (isMobile()){
        window.open(item?.url, "_blank");
      } else {
        copy(item?.url);
        message.success("Copy link successfully, please open it with a browser on your mobile device");
      }
    }

  };

  return (
    <div onClick={toDetails} className={styles.flexContainer}>
      <div className={styles.imgContainer}>
        <img
          src={item.image}
          alt='Image'
          className={styles.rcImage}
        />
      </div>

      <div className={styles.textContainer}>
        <div style={{
          display:"flex",
          justifyContent:"space-between"
        }}>
          <div>
            <div className={styles.price}>{convertPrice(item.price)}</div>
            <div className={styles.normal_wrap}>Earn per sale</div>
          </div>
          <div>
            <div className={styles.price}>{item.finishRate}%</div>
            <div className={styles.normal_wrap}>Commission</div>
          </div>
        </div>
        <div className={styles.title}>{item.title}</div>
        {/* <span className={styles.commission}>Commission ¥20</span>*/}
        <div className={styles.sold}>Sold {item.soldNum}</div>
        <SizeBox h={10}></SizeBox>
        <div onClick={toAddTk} className={styles.sampleBtn}>
          <div className={styles.btnInner}>一键加橱</div>
        </div>
      </div>

      <div className={styles.iconContainer}>
        <i className={`icon-class ${styles.icon}`}></i>
      </div>
    </div>
  );
};

export default HomeCard;
