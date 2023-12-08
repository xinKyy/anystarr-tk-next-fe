import styles from './index.module.scss';
import {Button, message, Skeleton} from "antd";
import {useEffect, useState} from "react";
import {t} from "i18next";
import {useSelector} from "react-redux";
import {connectWallet} from "@/utils/walletTools";
import useDispatchAction from "@/hooks/useDisptachAction";
import {setWalletInfo} from "@/redux/actions/home";
import {getRevenueDetailsMap, getWithdrawalLogs, withdrawUSDT} from "@/utils/walletConact";
import web3 from "web3";
import {numSubString} from "@/utils/numUtils";
const Income = () =>{
  const BN1 = web3.utils.toWei("1", 'ether');
  const [tabIndex, setTabIndex] = useState(0);
  const walletInfo = useSelector(state => state.home.walletInfo.walletInfo);
  const dispatchAction = useDispatchAction({ setWalletInfo });
  const [withdrawLogList, setWithdrawLogList] = useState([]);
  const [depositLogList, setDepositLogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  const transferMenu = {
    "0":"直推充值",
    "1":"间推充值",
    "2":"团队充值",
  };

  useEffect( ()=>{
    init();
  }, []);

  const init = async () =>{
    await connectWallet(dispatchAction);
    setLoading(true);
    getWithdrawalLogs().then(resp=>{
      setWithdrawLogList(resp);
    }).finally(()=>{
      setLoading(false);
    });
    setLoading(true);
    getRevenueDetailsMap().then(resp=>{
      setDepositLogList(resp);
    }).finally(() =>{
      setLoading(false);
    });
  };

  const withdraw = () =>{
    setWithdrawLoading(true);
    withdrawUSDT().then(resp=>{
      message[resp.result ? "success" : "error"](resp.msg);
      if (resp.result){
        init();
      }
    }).finally(()=>{
      setWithdrawLoading(false);
    });
  };

  return <div className={styles.income_page}>
    <div className={styles.card_wrap}>
      <div className={styles.card_title}>{t("t29")}</div>
      <div className={styles.withdraw_warp}>
        <div className={styles.balance_warp}>{walletInfo.myBalance ?? 0}</div>
        <Button onClick={withdraw} loading={withdrawLoading} className={styles.withdraw_btn}>{t("t30")}</Button>
      </div>
      <div className={styles.income_wrap}>
        <div className={styles.yestoday_wrap}>
          <div className={styles.sub_title}>
            {t("t31")}
          </div>
          <div className={styles.balance_title}>{walletInfo.yesterdayIncome ?? 0}U</div>
        </div>
        <div className={styles.yestoday_wrap}>
          <div className={styles.sub_title}>
            {t("t32")}
          </div>
          <div className={styles.balance_title}>{walletInfo.cumulativeGain ?? 0}U</div>
        </div>
      </div>
    </div>

    <div className={styles.log_wrap}>
      <div className={styles.tab_wrap}>
        <div onClick={()=>setTabIndex(0)} className={`${styles.tab_view} ${ tabIndex === 0 ? styles.tab_active_view : ""}`}>{t("t33")}</div>
        <div onClick={()=>setTabIndex(1)} className={`${styles.tab_view} ${ tabIndex === 1 ? styles.tab_active_view : ""}`}>{t("t34")}</div>
      </div>

      {
        tabIndex === 0 ?
          <div className={styles.history_wrap}>
            <div className={styles.tr_wrap}>
              <div className={styles.th_1}>{t("t35")}</div>
              <div className={styles.th_3}>{t("t36")}</div>
            </div>
            <div className={styles.logs_wrap}>
              <Skeleton loading={loading} active >
                {
                  withdrawLogList && withdrawLogList.map(item =>{
                    return  <div className={styles.tr_wrap}>
                      <div className={styles.th_1}>{numSubString(item.amount / BN1)}</div>
                      <div className={styles.th_3}>{new Date(item.timeString * 1000).toLocaleString()}</div>
                    </div>;
                  })
                }
              </Skeleton>
            </div>
          </div>
          :
          <div className={styles.history_wrap}>
            <div className={styles.tr_wrap}>
              <div className={styles.th_1}>{t("t35")}</div>
              <div className={styles.th_2}>{t("t37")}</div>
              <div className={styles.th_3}>{t("t36")}</div>
            </div>
            <div className={styles.logs_wrap}>
              <Skeleton loading={loading} active >
                {
                  depositLogList.map(item =>{
                    return   <div className={styles.tr_wrap}>
                      <div className={styles.th_1}>{numSubString(item.amount / BN1)}</div>
                      <div className={styles.th_2}>{transferMenu[item.details]}</div>
                      <div className={styles.th_3}>{new Date(item.time * 1000).toLocaleString()}</div>
                    </div>;
                  })
                }
              </Skeleton>
            </div>
          </div>
      }
    </div>
  </div>;
};


export default Income;
