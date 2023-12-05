import styles from './index.module.scss';
import {Button} from "antd";
import {useState} from "react";
const Income = () =>{

  const [tabIndex, setTabIndex] = useState(0);



  return <div className={styles.income_page}>
    <div className={styles.card_wrap}>
      <div className={styles.card_title}>当前可提现收益</div>
      <div className={styles.withdraw_warp}>
        <div className={styles.balance_warp}>0.035U</div>
        <Button className={styles.withdraw_btn}>提现</Button>
      </div>
      <div className={styles.income_wrap}>
        <div className={styles.yestoday_wrap}>
          <div className={styles.sub_title}>
            昨日收益
          </div>
          <div className={styles.balance_title}>0.035U</div>
        </div>
        <div className={styles.yestoday_wrap}>
          <div className={styles.sub_title}>
            累计收益
          </div>
          <div className={styles.balance_title}>0.035U</div>
        </div>
      </div>
    </div>

    <div className={styles.log_wrap}>
      <div className={styles.tab_wrap}>
        <div onClick={()=>setTabIndex(0)} className={`${styles.tab_view} ${ tabIndex === 0 ? styles.tab_active_view : ""}`}>提现记录</div>
        <div onClick={()=>setTabIndex(1)} className={`${styles.tab_view} ${ tabIndex === 1 ? styles.tab_active_view : ""}`}>收益明细</div>
      </div>

      {
        tabIndex === 0 ?
          <div className={styles.history_wrap}>
            <div className={styles.tr_wrap}>
              <div className={styles.th_1}>数量</div>
              <div className={styles.th_3}>时间</div>
            </div>
            <div className={styles.tr_wrap}>
              <div className={styles.th_1}>0.05</div>
              <div className={styles.th_3}>2021-07-22 15:12:32</div>
            </div>
          </div>
          :
          <div className={styles.history_wrap}>
            <div className={styles.tr_wrap}>
              <div className={styles.th_1}>数量</div>
              <div className={styles.th_2}>类型</div>
              <div className={styles.th_3}>时间</div>
            </div>
            <div className={styles.tr_wrap}>
              <div className={styles.th_1}>0.05</div>
              <div className={styles.th_2}>充值</div>
              <div className={styles.th_3}>2021-07-22 15:12:32</div>
            </div>
          </div>
      }

    </div>
  </div>;
};


export default Income;
