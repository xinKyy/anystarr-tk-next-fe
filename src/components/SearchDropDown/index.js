import React, {useCallback, useRef, useState, useMemo, useEffect} from 'react';
import styles from './index.module.scss';
import debounce from 'lodash.debounce';
import {Input, Select} from "antd";
import {CloseCircleFilled} from "@ant-design/icons";
const { Option } = Select;
const SearchDropDown = ({onSearch, show, hover, noHover, onBlur}) => {

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
    <div  className={styles.SearchDropDown}>
      <div onMouseEnter={hover} onMouseLeave={noHover} className={styles.dropDown}>
        {
          history.map(item=>{
            return <div onClick={(e)=>{
              e.stopPropagation();
              onSearch(e, item);
            }} className={styles.dropDownItem}>
              <div style={{
                display:"flex",
                alignItems:"center"
              }}>
                <img src='/static/historyTime.png' style={{withdth: 16, height: 16, marginRight:"10px"}}></img>
                <div>{item.name}</div>
              </div>
              <div onClick={(e)=>onRemove(e, item)}><CloseCircleFilled /></div>
            </div>;
          })
        }
      </div>
    </div>
  );
};

export default SearchDropDown;
