import styles from "./index.module.scss";
import React, { useState, useEffect } from 'react';


const SortBy = ({current, onChange}) => {
  // 点击后动态改变排序状态
  const isSomeConditionTrue = true;
  const [sortByData, setSortByData] = useState([
    {
      name: 'Total sold',
      sort: -1,
      type: 2,
    },
    {
      name: 'Sold',
      subName: 'yesterday',
      sort: -1,
      type: 3
    },
    {
      name: 'Earn per sale',
      sort: -1,
      type: 6
    },
    {
      name: 'Commissonn rate',
      sort: -1,
      type: 4
    }
  ]);
  const [currentSort, setCurrentSort] = useState(-1);
  const [currentSortType, setCurrentSorType] = useState(-1);

  const onChangeSwitch = (type, index) => {
     console.log(index);

     setSortByData((prevData) => {
       // 设置所有项的sort值都为-1
       prevData.forEach((item, subIndex) => {
         if (index !== subIndex) {
            item.sort = -1;
         }
       });
      const newData = [...prevData];
       const item = newData[index];
       // 如果是-1 则赋值为 1
       if (item.sort === -1) {
         item.sort = 1;
       } else if (item.sort === 1){
         item.sort = 2;
       } else {
         item.sort = null;
       }
       setCurrentSort(type);
       setCurrentSorType(item.sort);

      return newData;
    });
  };

  useEffect(() => {
    onChange(currentSort, currentSortType);
  }, [currentSort, currentSortType]);

  return (
    <div className={styles.container}>

      <div onClick={()=>onChange(5, 1)} className={`${styles.sortItem} ${ current === 5 && styles.active}`}>
        <div className={styles.itemText}>
          <img  src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-next-asset/recommend.png"}/>
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
            onClick={() => onChangeSwitch(item.type, index)}
            className={`${styles.sortItem} ${item.sort === 1 && styles.active} ${current === item.type && styles.sort_item_active}` }
              >
                <div className={styles.itemText}>{item.name}
                  { item.subName && <span className={styles.subName}>({item.subName})</span> }
                </div>
                <div className={styles.arrows}>
                  <div className={`${item.sort === 1 ? styles.activeUp : styles.arrowUp}`}></div>
                  <div className={`${item.sort === 2 ? styles.activeDown : styles.arrowDown}`}></div>
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
