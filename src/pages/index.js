
import styles from '../components/Home/home.module.scss';
import {Button, Drawer, Progress, Slider} from "antd";
import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {RightOutlined} from "@ant-design/icons";
import {splitWalletAddress} from "@/utils/addressUtil";
import {useSelector} from "react-redux";
import useDispatchAction from "@/hooks/useDisptachAction";
import {addToNumber, decrement, increment, reset, setWalletInfo} from "@/redux/actions/home";
const ChartComponents = dynamic(() => import('@/components/Home/chartComponents'), { ssr: false });

const BuyCoinItem = ({max, min}) =>{

  const [currentValue, setCurrentValue] = useState(min + (max - min) / 2);

  return  <div className={styles.buy_coin_wrap}>
    <div className={styles.left_wrap}>
      <div className={styles.sku_title}>0.035U</div>
      <Slider value={currentValue} onChange={setCurrentValue}  max={max} min={min} defaultValue={currentValue}  />
      <div className={styles.min_max_wrap}>
        <div>{min}</div>
        <div>{max}</div>
      </div>
    </div>
    <div className={styles.right_wrap}>购买 {currentValue}</div>
  </div>;
};

const Home = ( ) =>{

  const walletInfo = useSelector(state => state.home.walletInfo.walletInfo);
  const dispatchAction = useDispatchAction({ setWalletInfo });


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
      <div className={`${styles.coin_name}`}>MOD</div>
    </div>

    <div className={styles.home_qty_wrap}>
      <div className={`${styles.middle_wrap}`}>
        <div className={styles.amount_icon}></div>
        <div>私募发行价格  $0.1</div>
      </div>
    </div>

    <div className={styles.home_qty_wrap}>
      <div className={`${styles.middle_wrap}`}>
        <div className={`${styles.amount_icon} ${styles.qty_icon}`}></div>
        <div>私募发行量  50,000,000</div>
      </div>
    </div>

    <div className={styles.home_qty_wrap}>
      <div className={`${styles.middle_wrap}`}>
        <div className={`${styles.amount_icon} ${styles.time_icon}`}></div>
        <div>私募锁仓时间（天）  1096</div>
      </div>
    </div>

    <div className={styles.home_bottom_wrap}>
      <div className={styles.wrap_title}>
        <div className={styles.mod_title}>MOD代币</div>
        <div className={styles.mod_des}>价格（0.1ETH=0.1MOD）</div>
      </div>

      <div className={styles.section_title}>当前代币剩余：5000000</div>
      <div className={styles.slider_wrap}>
        <Slider disabled defaultValue={50}  />
      </div>

      <div className={styles.section_title}>购买套餐：</div>
      <BuyCoinItem min={100} max={500}></BuyCoinItem>
      <BuyCoinItem min={501} max={1000}></BuyCoinItem>
      <BuyCoinItem min={1001} max={3000}></BuyCoinItem>

      <div className={`${styles.section_title} ${styles.center_title}`}>我的可领取：2000.0000MOD</div>
      <Button className={styles.section_btn}>领取</Button>
    </div>

    <div className={styles.home_bottom_wrap}>
      <div className={styles.wrap_title}>
        <div className={styles.radius_wrap_title}>分配</div>
      </div>
      <ChartComponents className={styles.radius_wrapper}></ChartComponents>
      <div className={styles.coin_fixed_wrap}>
        <div className={styles.content_wrap}>
          <div className={styles.me_wrap}></div>
          <div>私募</div>
        </div>
        <div className={styles.content_wrap}>
          <div className={styles.low_wrap}></div>
          <div>底池</div>
        </div>
        <div className={styles.content_wrap}>
          <div className={styles.int_wrap}></div>
          <div>技术</div>
        </div>
        <div className={styles.content_wrap}>
          <div className={styles.s_wrap}></div>
          <div>社区</div>
        </div>
        <div className={styles.content_wrap}>
          <div className={styles.nature_wrap}></div>
          <div>生态</div>
        </div>
      </div>
    </div>

    <div className={styles.home_bottom_wrap}>
      <div className={styles.wrap_title}>
        <div className={styles.mod_title}>分享</div>
        <div className={styles.mod_des}>
          收益详情 <RightOutlined />
        </div>
      </div>
      <div className={styles.flex_wrap}>
        <div className={styles.flex_item_wrap}>
          <div className={styles.star_icon}></div>
          <div>当前等级</div>
        </div>
        <div className={styles.right_wrap}>MI</div>
      </div>
      <div className={styles.flex_wrap}>
        <div className={styles.flex_item_wrap}>
          <div className={styles.people_icon}></div>
          <div>分享人数</div>
        </div>
        <div className={styles.right_wrap}>0</div>
      </div>
      <div className={styles.flex_wrap}>
        <div className={styles.flex_item_wrap}>
          <div className={styles.share_icon}></div>
          <div>分享总收益（USDT）</div>
        </div>
        <div className={styles.right_wrap}>0</div>
      </div>
      <div className={styles.share_link_wrap}>
        <div>邀请链接：<span className={styles.link_wrap}>{ walletInfo.address ? splitWalletAddress(walletInfo.address) : "登录后查看"}</span></div>
        <Button className={styles.copy_btn}>复制</Button>
      </div>
    </div>

    <div className={styles.home_partners_title}>合作伙伴</div>

    <div className={styles.home_partners_wrap}>
      <div className={styles.coin_base_icon}></div>
      <div className={styles.luno_icon}></div>
      <div className={styles.kraken_icon}></div>
      <div className={styles.solana_icon}></div>
    </div>
  </div>;
};

export default Home;
