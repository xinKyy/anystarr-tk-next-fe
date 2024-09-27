import React from 'react';
import styles from './index.module.scss';
import SizeBox from "@/components/SizeBox";
import {useRouter} from "next/router"; // 假设你将 SCSS 文件命名为 YourStyles.module.scss

const HomeCard = ({item}) => {

  const router = useRouter();


  const toDetails = () =>{
    router.push(`/product/${item.productId}`);
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
            <div className={styles.price}>{item.price}</div>
            <div className={styles.normal_wrap}>Earn per sale</div>
          </div>
          <div>
            <div className={styles.price}>{item.price}</div>
            <div className={styles.normal_wrap}>Commission</div>
          </div>
        </div>
        <div className={styles.title}>{item.title}</div>
        {/* <span className={styles.commission}>Commission ¥20</span>*/}
        <div className={styles.sold}>Sold {item.soldNum}</div>
        <SizeBox h={10}></SizeBox>
        <div className={styles.sampleBtn}>
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
