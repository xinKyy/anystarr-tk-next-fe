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
        <span role='img' className={`${styles.icon} anticon`}>
          <svg
            width='1em'
            height='1em'
            fill='currentColor'
            aria-hidden='true'
            focusable='false'
          >
            <use xlinkHref='#icon-search' />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
