import React, {useCallback, useRef} from 'react';
import styles from './index.module.scss';
import debounce from 'lodash.debounce';
import {Input} from "antd";

const SearchBar = ({onChange}) => {

  const searchName = useRef();

  const debouncedOnChange = useCallback(
    debounce((value) => {
      searchName.current = value;
      onChange(value);
    }, 500), // 300ms 的防抖时间
    []
  );

  return (
    <div style={{
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      width:"100%",
      color:"#000"
    }}>
      <div style={{
        color:"#000"
      }}>
        <a className={styles.a} href={"https://www.anystarr.com/en/terms-and-conditions/"}>
          Terms and Conditions
        </a>
        <a className={styles.a} href={"https://www.anystarr.com/en/privacy-policy/"}>
          Privacy Policy
        </a>
      </div>
      <div className={styles.searchBar}>
        <Input
          onChange={(e)=>{
            debouncedOnChange(e.target.value);
          }}
          className={styles.inputField}
          placeholder='Search product'
        />
        <div onClick={()=>debouncedOnChange(searchName.current)} className={styles.searchButton}>
          <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-next-asset/search.svg"} className={`${styles.icon} anticon`}>
          </img>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
