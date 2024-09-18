import styles from "./index.module.scss";

const SortBy = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.sortItem} ${styles.active}`}>
        <div className={styles.itemText}>Best Match</div>
        <div className={styles.arrows}>
          <div className={styles.arrowUp}></div>
          <div className={styles.arrowDown}></div>
        </div>
      </div>

      <div className={styles.sortItem}>
        <div className={styles.itemText}>Total Sales</div>
        <div className={styles.arrows}>
          <div className={styles.arrowUp}></div>
          <div className={styles.arrowDown}></div>
        </div>
      </div>

      <div className={styles.sortItem}>
        <div className={styles.itemText}>Earn per sale</div>
        <div className={styles.arrows}>
          <div className={styles.arrowUp}></div>
          <div className={styles.arrowDown}></div>
        </div>
      </div>

      <div className={styles.sortItem}>
        <div className={styles.itemText}>Commission Rate</div>
        <div className={styles.arrows}>
          <div className={styles.arrowUp}></div>
          <div className={styles.arrowDown}></div>
        </div>
      </div>

      <div className={styles.sortItem}>
        <div className={styles.itemText}>Price</div>
        <div className={styles.arrows}>
          <div className={styles.arrowUp}></div>
          <div className={styles.arrowDown}></div>
        </div>
      </div>

      <div className={styles.sortItem}>
        <div className={styles.itemText}>Latest</div>
        <div className={styles.arrows}>
          <div className={styles.arrowUp}></div>
          <div className={styles.arrowDown}></div>
        </div>
      </div>
    </div>
  );
};

export default SortBy
