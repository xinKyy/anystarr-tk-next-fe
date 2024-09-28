import React from 'react';
import styles from './index.module.scss';
import productBg from '../../imgs/product/product_bg.png';
const ProductPrice = ({price, rate}) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={productBg.src}
        alt='Product Background'
      />
      <div className={`${styles.overlay} ${styles.left}`}>
        <div className={styles.content}>
          <div className={styles.label}>Earn per sale</div>
          <div className={styles.value}>{price}</div>
        </div>
      </div>
      <div className={`${styles.overlay} ${styles.right}`}>
        <div className={styles.content}>
          <div className={styles.label}>Commission</div>
          <div className={styles.value}>{rate}%</div>
        </div>
      </div>
    </div>
  );
};

export default ProductPrice;
