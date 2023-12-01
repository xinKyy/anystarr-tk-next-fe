
import styles from '../components/Home/home.module.scss';

const Home = ( ) =>{
  return <div className={styles.home_page}>
    <div className={styles.home_bg}>
      <div className={styles.home_radius}></div>
      <div className={styles.home_front}></div>
      <div className={styles.home_line}></div>
    </div>
    <div className={styles.home_qty_wrap}>
      <div className={styles.home_start_all_wrap}>发行总量100,000,000</div>
    </div>
    <div className={styles.home_qty_wrap}>
      <div className={`${styles.home_start_all_wrap} ${styles.coin_name_btn}`}>代币名称</div>
    </div>
    <div className={styles.home_qty_wrap}>
      <div className={`${styles.home_start_all_wrap} ${styles.coin_name_btn}`}>代币名称</div>
    </div>

  </div>;
};

export default Home;
