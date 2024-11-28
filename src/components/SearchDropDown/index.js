import React, {useCallback, useRef, useState, useMemo} from 'react';
import styles from './index.module.scss';
import debounce from 'lodash.debounce';
import {Input, Select} from "antd";
import {CloseCircleFilled} from "@ant-design/icons";
const { Option } = Select;
const SearchDropDown = ({zz}) => {

  const [history, setHistory] = useState([]);

  if (history.length <= 0) return <div></div>;

  return (
    <div className={styles.SearchDropDown}>
      <div className={styles.dropDown}>
          <div className={`${styles.dropDownItem} ${styles.no_hover}`}>
            <div></div>
            <div><img src='/static/historyTime.png' style={{withdth: 16, height: 16}}></img></div>
          </div>
        {
          history.map(item=>{
            return <div className={styles.dropDownItem}>
              <div>{item}</div>
              <div><CloseCircleFilled /></div>
            </div>;
          })
        }
      </div>
    </div>
  );
};

export default SearchDropDown;
