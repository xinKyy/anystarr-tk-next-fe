import React from 'react';
import styles from './index.module.scss';
import SizeBox from "@/components/SizeBox"; // 假设你将 SCSS 文件命名为 YourStyles.module.scss

const HomeCard = () => {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.imgContainer}>
        <img
          src='https://p19-oec-ttp.tiktokcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/671058679dac4cb6a2deb499a21d58e5~tplv-omjb5zjo8w-resize-jpeg:2000:2000.jpeg?from=520841845'
          alt='Image'
          className={styles.rcImage}
        />
      </div>

      <div className={styles.textContainer}>
        <span className={styles.price}>¥168</span>
        <span className={styles.commission}>Commission ¥20</span>
        <div className={styles.title}>Product Title</div>
        <span className={styles.sold}>Sold 50+</span>
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
