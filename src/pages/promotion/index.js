import styles from  '../income/index.module.scss';
import {t} from "i18next";
import {Button, Skeleton} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import {copyLink, splitWalletAddress} from "@/utils/addressUtil";
import {useEffect, useState} from "react";
import {BN1, getOwnerAmount, getTeamIncome, getTeamPerformance} from "@/utils/walletConact";
import {numSubString} from "@/utils/numUtils";
import {connectWallet} from "@/utils/walletTools";
import useDispatchAction from "@/hooks/useDisptachAction";
import {setWalletInfo} from "@/redux/actions/home";
import web3 from "web3";
import {useSelector} from "react-redux";


const PromotionItem = ({item}) => {
  return <div className={styles.share_card}>
    <div className={styles.card_head}>
      <div onClick={()=>copyLink(item["_address"])} className={styles.account_title}>
        {t("t66")}{splitWalletAddress(item["_address"])}
        <CopyOutlined  />
      </div>
      <div className={styles.level_btn}>M{item["teamLevel"]}</div>
    </div>
    <div className={styles.card_person_wrap}>
      <div className={styles.left_wrapper}>
        <div className={styles.person_head_pic}></div>
        <div>{t("t67")}</div>
      </div>
      <div className={styles.right_wrapper}>{numSubString(item["personalAmount"])}</div>
    </div>
    <div className={styles.card_person_wrap}>
      <div className={styles.left_wrapper}>
        <div className={styles.team_head_pic}></div>
        <div>{t("t68")}</div>
      </div>
      <div className={styles.right_wrapper}>{numSubString(item["teamAmount"])}</div>
    </div>
  </div>;
};

const Promotion = ()=>{

  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [teamIncome, setTeamIncome] = useState(0);
  const [myIncome, setMyIncome] = useState(0);
  const walletInfo = useSelector(state => state.home.walletInfo.walletInfo);
  const dispatchAction = useDispatchAction({ setWalletInfo });
  useEffect(async ()=>{
    await connectWallet(dispatchAction);
    init();
  }, []);

  const init = () => {
    setLoading(true);
    getTeamPerformance().then(resp=>{
      resp = resp.map(item=>{
        let currentItem = {
          ...item
        };
        currentItem.teamAmount = item["teamAmount"] / BN1;
        currentItem.personalAmount = item["personalAmount"] / BN1;
        return currentItem;
      });
      setDataList(resp);
    }).finally(()=>{
      setLoading(false);
    });

    getTeamIncome().then(resp =>{
      setTeamIncome(resp);
    });
    getOwnerAmount().then(resp =>{
      setMyIncome(resp);
    });
  };

  return <div className={styles.income_page}>
    <div className={styles.card_wrap}>
      <div className={styles.promotion}>
        <div className={styles.level_wrap}>{t("t69")}</div>
        <dvi className={styles.level_num_wrap}>
          <div className={styles.pro_crown_icon}></div>
          <div>M{walletInfo.currentLevel ?? 0}</div>
        </dvi>
      </div>
      <div className={styles.income_wrap}>
        <div className={styles.yestoday_wrap}>
          <div className={styles.sub_title}>
            {t("t67")}
          </div>
          <div className={styles.balance_title}>{myIncome}</div>
        </div>
        <div className={styles.yestoday_wrap}>
          <div className={styles.sub_title}>
            {t("t68")}
          </div>
          <div className={styles.balance_title}>{teamIncome}</div>
        </div>
      </div>
    </div>
    <div className={styles.share_title_wrap}>
      <div className={styles.blue_icon}></div>
      <div className={styles.share_title}>{t("t70")}</div>
    </div>

    <Skeleton loading={loading} active >
      {
        dataList && dataList.map(item=>{
          return <PromotionItem item={item}></PromotionItem>;
        })
      }
    </Skeleton>

  </div>;
};

export default Promotion;
