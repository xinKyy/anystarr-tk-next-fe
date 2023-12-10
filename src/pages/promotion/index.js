import styles from  '../income/index.module.scss';
import {t} from "i18next";
import {Button} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import {copyLink} from "@/utils/addressUtil";


const PromotionItem = () => {


  return <div className={styles.share_card}>
    <div className={styles.card_head}>
      <div onClick={()=>copyLink("aaa")} className={styles.account_title}>
        账户：0x190...c11
        <CopyOutlined  />
      </div>
      <div className={styles.level_btn}>M1</div>
    </div>
    <div className={styles.card_person_wrap}>
      <div className={styles.left_wrapper}>
        <div className={styles.person_head_pic}></div>
        <div>个人业绩(USDT)</div>
      </div>
      <div className={styles.right_wrapper}>1000</div>
    </div>
    <div className={styles.card_person_wrap}>
      <div className={styles.left_wrapper}>
        <div className={styles.team_head_pic}></div>
        <div>团队业绩</div>
      </div>
      <div className={styles.right_wrapper}>1000</div>
    </div>
  </div>;
};

const Promotion = ()=>{
  return <div className={styles.income_page}>
    <div className={styles.card_wrap}>
      <div className={styles.promotion}>
        <div className={styles.level_wrap}>当前等级</div>
        <dvi className={styles.level_num_wrap}>
          <div className={styles.pro_crown_icon}></div>
          <div>M1</div>
        </dvi>
      </div>
      <div className={styles.income_wrap}>
        <div className={styles.yestoday_wrap}>
          <div className={styles.sub_title}>
            个人业绩(USDT)
          </div>
          <div className={styles.balance_title}>1000</div>
        </div>
        <div className={styles.yestoday_wrap}>
          <div className={styles.sub_title}>
            团队业绩
          </div>
          <div className={styles.balance_title}>1000</div>
        </div>
      </div>
    </div>
    <div className={styles.share_title_wrap}>
      <div className={styles.blue_icon}></div>
      <div className={styles.share_title}>分享直推账户</div>
    </div>

    <PromotionItem></PromotionItem>
    <PromotionItem></PromotionItem>
    <PromotionItem></PromotionItem>

  </div>;
};

export default Promotion;
