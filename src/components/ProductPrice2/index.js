import React from 'react';
import styles from './index.module.scss';
import productBg from '../../imgs/product/price_bg_2.png';
const ProductPrice2 = () => {
  return (
    <div className={styles.commissionContainer}>
      <img className={styles.commissionImage} src={productBg.src} alt='Commission' />
      <div className={`${styles.commissionInfo} ${styles.left}`}>
        <div className={styles.label}>Open Collab</div>
        <div className={styles.subLabel}>Commission</div>
        <div className={`${styles.commissionRate}`}>15%</div>
        <div className={styles.rateLabel}>Commission Rate</div>
      </div>
      <div className={`${styles.commissionInfo} ${styles.right} ${styles.commissionInfo_right}`}>
        <div className={styles.label}>Exclusive</div>
        <div className={styles.subLabel}>Commission</div>
        <div className={`${styles.commissionRate} ${styles.exclusive}`}>20%</div>
        <div className={styles.rateLabel}>Commission Rate</div>
      </div>
    </div>
  );
};

export default ProductPrice2;
