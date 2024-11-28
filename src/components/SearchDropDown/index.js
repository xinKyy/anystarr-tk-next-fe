import React, {useCallback, useRef, useState, useMemo} from 'react';
import styles from './index.module.scss';
import debounce from 'lodash.debounce';
import {Input, Select} from "antd";
import {CloseCircleFilled} from "@ant-design/icons";
const { Option } = Select;
const SearchDropDown = ({zz}) => {

  
  return (
    <div className={styles.SearchDropDown}>
      <div className={styles.dropDown}>
          <div className={styles.dropDownItem}>
            <div></div>
            <div><img src='/static/historyTime.png' style={{withdth: 16, height: 16}}></img></div>
          </div>
          <div className={styles.dropDownItem}>
            <div>3123</div>
            <div><CloseCircleFilled /></div>
          </div>
      </div>
    </div>
  );
};

export default SearchDropDown;
