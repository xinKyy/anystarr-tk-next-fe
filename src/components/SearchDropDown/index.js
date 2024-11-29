import React, {useCallback, useRef, useState, useMemo, useEffect} from 'react';
import styles from './index.module.scss';
import debounce from 'lodash.debounce';
import {Input, Select} from "antd";
import {CloseCircleFilled} from "@ant-design/icons";
const { Option } = Select;
const SearchDropDown = ({onSearch, show, hover, noHover}) => {

  const [history, setHistory] = useState([]);

  useEffect(()=>{
    const list = localStorage.getItem("history");
    if (list){
      setHistory(JSON.parse(list));
    }
  }, [show]);

  const onRemove = (e, item) =>{
    e.stopPropagation();
    const newHistory = [];
    for (let i = 0; i < history.length; i++){
      if (history[i].name === item.name) continue;
      newHistory.push(history[i]);
    }
    setHistory(newHistory);
    localStorage.setItem("history", JSON.stringify(newHistory));
  };

  if (!history || history.length <= 0) return <div></div>;

  return (
    <div onFocus={show} onMouseEnter={hover} onMouseLeave={noHover} className={styles.SearchDropDown}>
      <div className={styles.dropDown}>
          <div className={`${styles.dropDownItem} ${styles.no_hover}`}>
            <div></div>
            <div><img src='/static/historyTime.png' style={{withdth: 16, height: 16}}></img></div>
          </div>
        {
          history.map(item=>{
            return <div onClick={(e)=>{
              e.stopPropagation();
              onSearch(e, item);
            }} className={styles.dropDownItem}>
              <div>{item.name}</div>
              <div onClick={(e)=>onRemove(e, item)}><CloseCircleFilled /></div>
            </div>;
          })
        }
      </div>
    </div>
  );
};

export default SearchDropDown;
