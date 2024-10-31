import styles from "./index.module.scss";

const SortBy = ({current, onChange}) => {
  return (
    <div className={styles.container}>

      <div onClick={()=>onChange(5)} className={`${styles.sortItem} ${ current === 5 && styles.active}`}>
        <div className={styles.itemText}>Random Product</div>
        <div className={styles.arrows}>
          <div className={styles.arrowUp}></div>
          <div className={styles.arrowDown}></div>
        </div>
      </div>

      <div onClick={()=>onChange(1)} className={`${styles.sortItem} ${ current === 1 && styles.active}`}>
        <div className={styles.itemText}>Product Sales</div>
        <div className={styles.arrows}>
          <div className={styles.arrowUp}></div>
          <div className={styles.arrowDown}></div>
        </div>
      </div>

      <div onClick={()=>onChange(2)}  className={`${styles.sortItem} ${ current === 2 && styles.active}`}>
        <div className={styles.itemText}>Total Sales</div>
        <div className={styles.arrows}>
          <div className={styles.arrowUp}></div>
          <div className={styles.arrowDown}></div>
        </div>
      </div>

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
      </div>
    </div>
  );
};

export default SortBy;
