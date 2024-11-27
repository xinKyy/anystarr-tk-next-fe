import styles from "./index.module.scss";
import React, { useState } from 'react';


const SortBy = ({current, onChange}) => {
  // 点击后动态改变排序状态
  const isSomeConditionTrue = true;
  const [myArray, setMyArray] = useState([
    {
      name: 'Total sold',
      sort: 1
    },
    {
      name: 'Sold (yesterday)',
      sort: 1
    },
    {
      name: 'Total sales',
      sort: 0
    },
    {
      name: 'Earn per sale',
      sort: 1
    }, 
    {
      name: 'Commissonn rate',
      sort: 1
    }
  ]);
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
            {myArray.map((item, index) => (
              <div
                key={index}
                onClick={() => onChange(index)}
                className={`${styles.sortItem} ${item.sort === 1 && styles.active}`}
              >
                <div className={styles.itemText}>{item.name}</div>
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
