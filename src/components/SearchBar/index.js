import React from 'react';
import styles from './index.module.scss';

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <input
        className={styles.inputField}
        placeholder='Search product'
      />
      <div className={styles.searchButton}>
        <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-next-asset/search.svg"} className={`${styles.icon} anticon`}>
        </img>
      </div>
    </div>
  );
};

export default SearchBar;
