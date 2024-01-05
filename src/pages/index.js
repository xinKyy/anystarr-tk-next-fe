
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
import {
  buyMod,
  connectToMetaMask,
  getMod,
  getPriceOne, getPriceThree,
  getPriceTwo,
  updateAvailableWithdrawal
} from "@/utils/walletConact";
import {connectWallet} from "@/utils/walletTools";
import {APIGetModAmount} from "@/api";
const ChartComponents = dynamic(() => import('@/components/Home/chartComponents'), { ssr: false });

const BuyCoinItem = ({max, min, current, price}) =>{
  const dispatchAction = useDispatchAction({ setWalletInfo });
  const buyModFunc = async () =>{
    setLoading(true);
    await connectWallet(dispatchAction);
    buyMod(currentValue, price).then(resp=>{
      message[resp.result ? "success" : "error"](resp.msg);
      connectWallet(dispatchAction);
    }).finally(()=>{
      setLoading(false);
    });
  };
  const [currentValue, setCurrentValue] = useState(current);
  const [loading, setLoading] = useState(false);

  return  <div className={styles.buy_coin_wrap}>
    <div className={styles.left_wrap}>
      <div className={styles.sku_title}>{price}U</div>
      <Slider value={currentValue} onChange={setCurrentValue}  step={100} max={max} min={min} defaultValue={currentValue}  />
      <div className={styles.min_max_wrap}>
        <div>{min}</div>
        <div>{max}</div>
      </div>
    </div>
    <Button disabled loading={loading}  onClick={buyModFunc} className={styles.right_wrap}>{t("t26")} {currentValue}</Button>
  </div>;
};

const Home = ( ) =>{

  const walletInfo = useSelector(state => state.home.walletInfo.walletInfo);
  const dispatchAction = useDispatchAction({ setWalletInfo });
  const [getModLoading, setGetModLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [price, setPrice] = useState({});

  useEffect(()=>{
    let currentPrice = {};
    getPriceOne().then(resp=>{
      currentPrice.one = resp;
      setPrice({
        ...currentPrice,
        one:resp
      });
    });
    getPriceTwo().then(resp=>{
      currentPrice.two = resp;
      setPrice({
        ...currentPrice,
        two:resp
      });
    });
    getPriceThree().then(resp=>{
      currentPrice.three = resp;
      setPrice({
        ...currentPrice,
        three:resp
      });
    });
    APIGetModAmount().then(resp=>{
      setTotalAmount(Number(resp.totalAmount));
    });
  }, []);

  const router = useRouter();

  const toIncome = () =>{
    router.push("/income");
  };

  const getModFunc = () =>{
    setGetModLoading(true);
    getMod(walletInfo.myModBalance ?? 0).then(resp =>{
      message[resp.result ? "success" : "error"](resp.msg);
      if (resp.result){
        connectWallet(dispatchAction);
      }
    }).finally(()=>{
      setGetModLoading(false);
    });
  };

  const copyShareLink = () =>{
    if (!walletInfo.address){
      message.error(t("t73"));
    }
    let shareLink = "http://" +  window.location.host + `?address=${walletInfo.address}`;
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

    {/* <div className={styles.home_qty_wrap}> */}
    {/*   <div className={`${styles.middle_wrap}`}> */}
    {/*     <div className={`${styles.amount_icon} ${styles.time_icon}`}></div> */}
    {/*     <div>{t("t5")}  1096</div> */}
    {/*   </div> */}
    {/* </div> */}

    <div className={styles.home_bottom_wrap}>
      <div className={styles.wrap_title}>
        <div className={styles.mod_title}>MOD {t("t6")}</div>
        {/* <div className={styles.mod_des}>{t("t7")}（0.1ETH=0.1MOD）</div> */}
      </div>

      <div className={styles.section_title}>{t("t8")}{
        // walletInfo.modBalance ?? 0
        totalAmount
      }</div>
      <div className={styles.slider_wrap}>
        {/* <Progress percent={(walletInfo.modBalance ?? 0) / 50000000 * 100} showInfo={false} strokeColor={{ */}
        {/*   '0%': '#9D26F7', '100%': '#314AF0' */}
        {/* }}  /> */}
        <Progress percent={totalAmount / 50000000 * 100} showInfo={false} strokeColor={{
          '0%': '#9D26F7', '100%': '#314AF0'
        }}  />
      </div>

      <div className={styles.section_title}>{t("t9")}</div>
      <BuyCoinItem  min={100} max={500} current={300} price={price.one}></BuyCoinItem>
      <BuyCoinItem  min={600} max={1000} current={800} price={price.two}></BuyCoinItem>
      <BuyCoinItem  min={1100} max={3000} current={2000} price={price.three}></BuyCoinItem>

      <div className={`${styles.section_title} ${styles.center_title}`}>{t("t10")}{walletInfo.myModBalance ?? 0} MOD</div>
      {
        walletInfo.btnNowStatus ? <Button disabled={!walletInfo.address} loading={getModLoading} onClick={getModFunc} className={styles.section_btn}>{t("t11")}</Button> : null
      }
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
        <div className={styles.crown_icon}></div>
      </div>
      <div className={styles.flex_wrap}>
        <div className={styles.flex_item_wrap}>
          <div className={styles.people_icon}></div>
          <div>{t("t21")}</div>
        </div>
        <div onClick={()=>router.push("/promotion")} className={styles.right_wrap}>
          {walletInfo.sharePersonNum ?? 0}
          <RightOutlined />
        </div>
        {/* <div  className={styles.right_wrap}> */}
        {/*   {walletInfo.sharePersonNum ?? 0} */}
        {/* </div> */}
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
      <div className={styles.mamon_icon}></div>
      <div className={styles.paradigm_icon}></div>
      <div className={styles.panguweb_icon}></div>
    </div>
    <div className={styles.home_partners_sec_wrap}>
      <div className={styles.youtube_icon}></div>
      <div className={styles.tiktok_icon}></div>
    </div>
  </div>;
};

export default Home;
