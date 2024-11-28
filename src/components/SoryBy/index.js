import styles from "./index.module.scss";
import React, { useState } from 'react';


const SortBy = ({current, onChange}) => {
  // 点击后动态改变排序状态
  const isSomeConditionTrue = true;
  const [sortByData, setSortByData] = useState([
    {
      name: 'Total sold',
      sort: -1
    },
    {
      name: 'Sold',
      subName: 'yesterday',
      sort: -1
    },
    {
      name: 'Total sales',
      sort: -1
    },
    {
      name: 'Earn per sale',
      sort: -1
    },
    {
      name: 'Commissonn rate',
      sort: -1
    }
  ]);

   const onChangeSwitch = (index) => {
     setSortByData((prevData) => {
      console.log(prevData, index);

      const newData = [...prevData];
       const item = newData[index];
       // 如果是-1 则赋值为 1
       if (item.sort === -1) {
         item.sort = 1;
       } else {
         item.sort = item.sort === 1 ? 0 : 1;
       }

      return newData;
    });
  };
  return (
    <div className={styles.container}>

      <div onClick={()=>onChange(5)} className={`${styles.sortItem} ${ current === 5 && styles.active}`}>
        <div className={styles.itemText}>
          <img src={"/refresh.png"}/>
        </div>
        {/* <div className={styles.arrows}>
          <div className={styles.arrowUp}></div>
          <div className={styles.arrowDown}></div>
        </div> */}
      </div>

      {/* <div onClick={()=>onChange(1)} className={`${styles.sortItem} ${ current === 1 && styles.active}`}>
        <div className={styles.itemText}>Product Sales</div>
        <div className={styles.arrows}>
        <div className={`${styles.arrowUp}`}></div>
          <div className={styles.arrowDown}></div>
        </div>
      </div> */}

      <div className={styles.container}>
            {sortByData.map((item, index) => (
              <div
                key={index}
                onClick={() => onChangeSwitch(index)}
                className={`${styles.sortItem} ${item.sort === 1 && styles.active}`}
              >
                <div className={styles.itemText}>{item.name}
                  { item.subName && <span className={styles.subName}>({item.subName})</span> }
                </div>
                <div className={styles.arrows}>
                  <div className={`${item.sort === 1 ? styles.activeUp : styles.arrowUp}`}></div>
                  <div className={`${item.sort === 0 ? styles.activeDown : styles.arrowDown}`}></div>
                </div>
              </div>
            ))}
    </div>
{/*
      <div  onClick={()=>onChange(3)} className={`${styles.sortItem} ${ current === 3 && styles.active}`}>
        <div className={styles.itemText}>Daily Sales</div>
        <div className={styles.arrows}>
          <div className={styles.arrowUp}></div>
          <div className={styles.arrowDown}></div>
        </div>
      </div>

      <div onClick={()=>onChange(4)}  className={`${styles.sortItem} ${ current === 4 && styles.active}`}>
        <div className={styles.itemText}>Commission Rate</div>
        <div className={styles.arrows}>
          <div className={styles.arrowUp}></div>
          <div className={styles.arrowDown}></div>
        </div>
      </div> */}
    </div>
  );
};

export default SortBy;
