import React, {useCallback, useRef, useState, useMemo} from 'react';
import styles from './index.module.scss';
import debounce from 'lodash.debounce';
import {Input, Select} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
const { Option } = Select;
const SearchBar = ({onChange, loading, searchNameRef, searchNameTypeRef}) => {

  const [searchName, setSearchName] = useState(searchNameRef);
  const [currenSearchType, setCurrentSearchType] = useState(searchNameTypeRef); // 1 pid 2 name 3 佣金率
  const currenSearchTypeRef = useRef(1); // 1 pid 2 name 3 佣金率

  const debouncedOnChange = useCallback(
    debounce((value) => {

      window.gtag && window.gtag('event', 'search', {
        'event_category': 'search',
        'event_label': 'search',
        'value': value,
      });

      onChange(value, currenSearchTypeRef.current);
    }, 500), // 300ms 的防抖时间
    []
  );

  const handleChange = (value) => {
    currenSearchTypeRef.current = value;
    setCurrentSearchType(value);
    searchNameTypeRef = value;
  };

  const selectBefore = (
    <Select style={{
      minWidth:"100px"
    }} onChange={handleChange} defaultValue={currenSearchType}>
      <Option value={1}>Product link</Option>
      <Option value={2}>Product name</Option>
    </Select>
  );

  const map = {
    1:"Product link",
    2:"Product name",
    3:"Commission rate",
  };

  const searchIcon = useMemo(()=><img src={"/search.svg"} className={`${styles.icon}`}/>, []);

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
        <a className={styles.a} href={"/Terms_and_Conditions_anyStarr.html"}>
          Terms and Conditions
        </a>
        <a className={styles.a} href={"/privacy_policy.html"}>
          Privacy Policy
        </a>
      </div>
      <div className={styles.searchBar}>
        <Input
          className={styles.inputField}
          value={searchName}
          addonBefore={selectBefore}
          onChange={(e)=>{
            setSearchName(e.target.value);
            searchNameRef = e.target.value;
          }}
          onPressEnter={(e)=>{
            onChange(searchName, currenSearchType);
          }}
          placeholder={`Search ${map[currenSearchType]}`}
        />
        <div onClick={()=>onChange(searchName, currenSearchType)} className={styles.searchButton}>
          {
            loading ? <LoadingOutlined></LoadingOutlined> : searchIcon
          }
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
