
import styles from '../components/Home/home.module.scss';
import {Button, Drawer, message, Progress, Slider} from "antd";
import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {RightOutlined} from "@ant-design/icons";
import {copyLink, splitWalletAddress} from "@/utils/addressUtil";
import {useSelector} from "react-redux";
import useDispatchAction from "@/hooks/useDisptachAction";
import {setWalletInfo} from "@/redux/actions/home";
import {useRouter} from "next/router";
import {t} from "i18next";
import {buyMod, connectToMetaMask, getMod, updateAvailableWithdrawal} from "@/utils/walletConact";
import {connectWallet} from "@/utils/walletTools";
const ChartComponents = dynamic(() => import('@/components/Home/chartComponents'), { ssr: false });

const BuyCoinItem = ({max, min}) =>{
  const dispatchAction = useDispatchAction({ setWalletInfo });
  const buyModFunc = async () =>{
    setLoading(true);
    await connectWallet(dispatchAction);
    buyMod(currentValue).then(resp=>{
      message[resp.result ? "success" : "error"](resp.msg);
    }).finally(()=>{
      setLoading(false);
    });
  };
  const [currentValue, setCurrentValue] = useState(min + (max - min) / 2);
  const [loading, setLoading] = useState(false);

  return  <div className={styles.buy_coin_wrap}>
    <div className={styles.left_wrap}>
      <div className={styles.sku_title}>0.035U</div>
      <Slider value={currentValue} onChange={setCurrentValue}  max={max} min={min} defaultValue={currentValue}  />
      <div className={styles.min_max_wrap}>
        <div>{min}</div>
        <div>{max}</div>
      </div>
    </div>
    <Button loading={loading}  onClick={buyModFunc} className={styles.right_wrap}>{t("t26")} {currentValue}</Button>
  </div>;
};

const Home = ( ) =>{

  const walletInfo = useSelector(state => state.home.walletInfo.walletInfo);
  const dispatchAction = useDispatchAction({ setWalletInfo });
  const [getModLoading, setGetModLoading] = useState(false);

  const router = useRouter();

  const toIncome = () =>{
    router.push("/income");
  };

  const getModFunc = () =>{
    setGetModLoading(true);
    getMod(walletInfo.myModBalance ?? 0).then(resp =>{
      message[resp.result ? "success" : "error"](resp.msg);
    }).finally(()=>{
      setGetModLoading(false);
    });
  };

  const copyShareLink = () =>{
    if (!walletInfo.address){
      message.error("请连接钱包后使用");
    }
    let shareLink = "http://" +  window.location.host + `?${walletInfo.address}`;
    copyLink(shareLink);
  };

  return <div className={styles.home_page}>
    <div className={styles.home_bg}>
      <div className={styles.home_radius}></div>
      <div className={styles.home_front}></div>
      <div className={styles.home_line}></div>
    </div>
    <div className={styles.home_qty_wrap}>
      <div className={styles.home_start_all_wrap}>{t("t1")}100,000,000</div>
    </div>
    <div className={styles.home_qty_wrap}>
      <div className={`${styles.home_start_all_wrap} ${styles.coin_name_btn}`}>{t("t2")}</div>
    </div>
    <div className={styles.home_qty_wrap}>
      <div className={`${styles.coin_name}`}>MOD</div>
    </div>

    {/* <div className={styles.home_qty_wrap}> */}
    {/*   <div className={`${styles.middle_wrap}`}> */}
    {/*     <div className={styles.amount_icon}></div> */}
    {/*     <div>{t("t3")}  $0.1</div> */}
    {/*   </div> */}
    {/* </div> */}

    <div className={styles.home_qty_wrap}>
      <div className={`${styles.middle_wrap}`}>
        <div className={`${styles.amount_icon} ${styles.qty_icon}`}></div>
        <div>{t("t4")}  50,000,000</div>
      </div>
    </div>

    <div className={styles.home_qty_wrap}>
      <div className={`${styles.middle_wrap}`}>
        <div className={`${styles.amount_icon} ${styles.time_icon}`}></div>
        <div>{t("t5")}  1096</div>
      </div>
    </div>

    <div className={styles.home_bottom_wrap}>
      <div className={styles.wrap_title}>
        <div className={styles.mod_title}>MOD {t("t6")}</div>
        {/* <div className={styles.mod_des}>{t("t7")}（0.1ETH=0.1MOD）</div> */}
      </div>

      <div className={styles.section_title}>{t("t8")}{walletInfo.modBalance ?? 0}</div>
      <div className={styles.slider_wrap}>
        <Progress percent={(walletInfo.modBalance ?? 0) / 5000000 * 100} showInfo={false} strokeColor={{
          '0%': '#9D26F7', '100%': '#314AF0'
        }}  />
      </div>

      <div className={styles.section_title}>{t("t9")}</div>
      <BuyCoinItem  min={100} max={500}></BuyCoinItem>
      <BuyCoinItem  min={501} max={1000}></BuyCoinItem>
      <BuyCoinItem  min={1001} max={3000}></BuyCoinItem>

      <div className={`${styles.section_title} ${styles.center_title}`}>{t("t10")}{walletInfo.myModBalance ?? 0} MOD</div>
      <Button disabled={!walletInfo.address} loading={getModLoading} onClick={getModFunc} className={styles.section_btn}>{t("t11")}</Button>
    </div>

    <div className={styles.home_bottom_wrap}>
      <div className={styles.wrap_title}>
        <div className={styles.radius_wrap_title}>{t("t12")}</div>
      </div>
      <div className={styles.radius_wrapper}>

      </div>
      <div className={styles.coin_fixed_wrap}>
        <div className={styles.content_wrap}>
          <div className={styles.me_wrap}></div>
          <div>{t("t13")}</div>
        </div>
        <div className={styles.content_wrap}>
          <div className={styles.low_wrap}></div>
          <div>{t("t14")}</div>
        </div>
        <div className={styles.content_wrap}>
          <div className={styles.int_wrap}></div>
          <div>{t("t15")}</div>
        </div>
        <div className={styles.content_wrap}>
          <div className={styles.s_wrap}></div>
          <div>{t("t16")}</div>
        </div>
        <div className={styles.content_wrap}>
          <div className={styles.nature_wrap}></div>
          <div>{t("t17")}</div>
        </div>
      </div>
    </div>

    <div className={styles.home_bottom_wrap}>
      <div className={styles.wrap_title}>
        <div className={styles.mod_title}>{t("t18")}</div>
        <div onClick={toIncome} className={styles.mod_des}>
          {t("t19")} <RightOutlined />
        </div>
      </div>
      <div className={styles.flex_wrap}>
        <div className={styles.flex_item_wrap}>
          <div className={styles.star_icon}></div>
          <div>{t("t20")}</div>
        </div>
        <div className={styles.right_wrap}>M{walletInfo.currentLevel ?? 0}</div>
      </div>
      <div className={styles.flex_wrap}>
        <div className={styles.flex_item_wrap}>
          <div className={styles.people_icon}></div>
          <div>{t("t21")}</div>
        </div>
        <div className={styles.right_wrap}>{walletInfo.sharePersonNum ?? 0}</div>
      </div>
      <div className={styles.flex_wrap}>
        <div className={styles.flex_item_wrap}>
          <div className={styles.share_icon}></div>
          <div>{t("t22")}（USDT）</div>
        </div>
        <div className={styles.right_wrap}>{walletInfo.totalIncome ?? 0}</div>
      </div>
      <div className={styles.share_link_wrap}>
        <div>{t("t23")}<span className={styles.link_wrap}>{ walletInfo.address ? splitWalletAddress(walletInfo.address) : t("t39")}</span></div>
        <Button onClick={copyShareLink} className={styles.copy_btn}>{t("t24")}</Button>
      </div>
    </div>

    <div className={styles.home_partners_title}>{t("t25")}</div>

    <div className={styles.home_partners_wrap}>
      <div className={styles.coin_base_icon}></div>
      <div className={styles.luno_icon}></div>
      <div className={styles.kraken_icon}></div>
      <div className={styles.solana_icon}></div>
    </div>
  </div>;
};

export default Home;
