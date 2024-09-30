import styles from "./index.module.scss";

const SortBy = ({current, onChange}) => {
  return (
    <div className={styles.container}>
      <div onClick={()=>onChange(1)} className={`${styles.sortItem} ${ current === 1 && styles.active}`}>
        <div className={styles.itemText}>产品销量</div>
        <div className={styles.arrows}>
          <div className={styles.arrowUp}></div>
          <div className={styles.arrowDown}></div>
        </div>
      </div>

      <div onClick={()=>onChange(2)}  className={`${styles.sortItem} ${ current === 2 && styles.active}`}>
        <div className={styles.itemText}>总销售额</div>
        <div className={styles.arrows}>
          <div className={styles.arrowUp}></div>
          <div className={styles.arrowDown}></div>
        </div>
      </div>

      <div  onClick={()=>onChange(3)} className={`${styles.sortItem} ${ current === 3 && styles.active}`}>
        <div className={styles.itemText}>日销售额 </div>
        <div className={styles.arrows}>
          <div className={styles.arrowUp}></div>
          <div className={styles.arrowDown}></div>
        </div>
      </div>

      <div onClick={()=>onChange(4)}  className={`${styles.sortItem} ${ current === 4 && styles.active}`}>
        <div className={styles.itemText}>佣金率</div>
        <div className={styles.arrows}>
          <div className={styles.arrowUp}></div>
          <div className={styles.arrowDown}></div>
        </div>
      </div>
    </div>
  );
};

export default SortBy;
