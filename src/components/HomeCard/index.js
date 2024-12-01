import React, {useState} from 'react';
import styles from './index.module.scss';
import SizeBox from "@/components/SizeBox";
import {useRouter} from "next/router";
import {isMobile} from "@/utils/action";
import copy from "copy-to-clipboard";
import {message} from "antd";
import {APIAddFavoriteItems, APIDeleteFavoriteItems, APIGetLinkByPid} from "@/api";
import {useSelector} from "react-redux";
import ConnectTikTipsModal from "@/components/connectTikTipsModal";
import useLogin from "@/hooks/useLogin";
import {LoadingOutlined} from "@ant-design/icons"; // 假设你将 SCSS 文件命名为 YourStyles.module.scss
function updateImageUrl(url, w, h) {
  if (!url) return "";
  return url.replace(/(\d+):(\d+)/, `${w}:${h}`);
}
const HomeCard = ({item, fromMyLike, checkItem, checked}) => {

  return <CardComp item={item} fromMyLike={fromMyLike} checkItem={checkItem} checked={checked} ></CardComp>;

  // return (
  //   <div onClick={toDetails} className={styles.flexContainer}>
  //     <div className={styles.textContainer}>
  //       <div className={styles.flex_center}>
  //         <div className={styles.imgContainer}>
  //           <img
  //             src={ item.alyImage ? item.alyImage : updateImageUrl(item.image, 500, 500)}
  //             alt='Image'
  //             className={styles.rcImage}
  //           />
  //         </div>
  //         <div style={{
  //           flex:1,
  //         }} className={styles.flex_column}>
  //           <div>
  //             <div className={styles.normal_wrap}>Price</div>
  //             <div className={styles.price}>{convertPrice(item.price)}</div>
  //           </div>
  //           <div>
  //             <div className={styles.normal_wrap}>Commission</div>
  //             <div className={styles.price}>{item.finishRate}%</div>
  //           </div>
  //           {/* <span className={styles.commission}>Commission ¥20</span>*/}
  //         </div>
  //       </div>
  //       <div className={styles.title}>{item.title}</div>
  //       <div className={styles.sold}>Total sold <div> {item.soldNum}</div></div>
  //       <SizeBox h={10}></SizeBox>
  //       <div className={styles.flex_center}>
  //         <div onClick={toAddTk} className={styles.sampleBtn}>
  //           <div className={styles.btnInner}> {
  //             loading && <LoadingOutlined></LoadingOutlined>
  //           } Add to Showcase</div>
  //         </div>
  //         {
  //           fromMyLike && <div onClick={(e)=>{
  //             e.stopPropagation();
  //             checkItem(item.productId);
  //           }} className={`${styles.select_icon} ${checked ? styles.active : ""}`}></div>
  //         }
  //       </div>
  //     </div>
  //
  //     <div className={styles.position_wrap}>
  //       <div className={styles.textContainer}>
  //         <div className={styles.flex_center}>
  //           <div className={styles.imgContainer}>
  //             <img
  //               src={ item.alyImage ? item.alyImage : updateImageUrl(item.image, 500, 500)}
  //               alt='Image'
  //               className={styles.rcImage}
  //             />
  //           </div>
  //           <div style={{
  //             flex:1,
  //           }} className={styles.flex_column}>
  //             <div>
  //               <div className={styles.normal_wrap}>Price</div>
  //               <div className={styles.price}>{convertPrice(item.price)}</div>
  //             </div>
  //             <div>
  //               <div className={styles.normal_wrap}>Commission</div>
  //               <div className={styles.price}>{item.finishRate}%</div>
  //             </div>
  //             {/* <span className={styles.commission}>Commission ¥20</span>*/}
  //           </div>
  //         </div>
  //         <div className={styles.title}>{item.title}</div>
  //         <div className={styles.sold}>Total sold <div> {item.soldNum}</div></div>
  //         <SizeBox h={10}></SizeBox>
  //         <div className={styles.flex_center}>
  //           <div onClick={toAddTk} className={styles.sampleBtn}>
  //             <div className={styles.btnInner}> {
  //               loading && <LoadingOutlined></LoadingOutlined>
  //             } Add to Showcase</div>
  //           </div>
  //           {
  //             fromMyLike && <div onClick={(e)=>{
  //               e.stopPropagation();
  //               checkItem(item.productId);
  //             }} className={`${styles.select_icon} ${checked ? styles.active : ""}`}></div>
  //           }
  //         </div>
  //       </div>
  //       <div className={styles.right_wrap}>
  //         <div className={styles.text_1}>Price</div>
  //         <div className={styles.text_2}>${56.33}</div>
  //         <div className={styles.text_1}>Vs.open collab</div>
  //         <div className={styles.text_3}>11%</div>
  //         <div className={styles.text_1}>Total sales</div>
  //         <div className={styles.text_4}>$20.7</div>
  //       </div>
  //     </div>
  //
  //     <div className={styles.iconContainer}>
  //       <i className={`icon-class ${styles.icon}`}></i>
  //     </div>
  //
  //     <div onClick={collect} className={ collected ? styles.stared_img : styles.star_img}></div>
  //
  //     {
  //       showConnectTips && <ConnectTikTipsModal show={showConnectTips} onCancel={()=>setShowConnectTips(false)}></ConnectTikTipsModal>
  //     }
  //   </div>
  // );
};


const CardComp = ({item, fromMyLike, checkItem, checked}) =>{
  const router = useRouter();
  const [collected, setCollected] = useState(item.collect);
  const { needLogin } = useLogin();
  const userInfo = useSelector(state => state.home.userInfo.userInfo);
  const [showConnectTips, setShowConnectTips] = useState(false);
  const [loading, setLoading] = useState(false);

  const toDetails = () =>{
    localStorage.setItem("toProductDetails", "1");
    router.push(`/product/${item.productId}`);
  };

  const convertPrice = (price) =>{
    if (price && price.indexOf("-") !== -1){
      return price.split("-")[0];
    }
    return price;
  };

  const toAddTk = (e) =>{
    e.stopPropagation();

    window.gtag && window.gtag('event', 'add_to_showcase', {
      'event_category': 'add_to_showcase',
      'event_label': 'add_to_showcase',
      'value': item.productId,
    });

    if (needLogin){
      setShowConnectTips(true);
      return;
    }
    if (loading) return;
    if (item.needApplyLink){
      setLoading(true);
      APIGetLinkByPid(item.productId).then(resp=>{
        if (resp.data.url){
          const url = resp.data.url;
          if (isMobile()){
            window.open(url, "_blank");
          } else {
            copy(url);
            message.success("Copy link successfully, please open it with a browser on your mobile device");
          }
        }
      }).finally(()=>{
        setLoading(false);
      });
    } else {
      const url = item.url;
      if (isMobile()){
        window.open(url, "_blank");
      } else {
        copy(url);
        message.success("Copy link successfully, please open it with a browser on your mobile device");
      }
    }
  };

  const addCollect = () =>{

    window.gtag && window.gtag('event', 'add_to_collection', {
      'event_category': 'add_to_collection',
      'event_label': 'add_to_collection',
      'value': item.productId,
    });

    let user = localStorage.getItem("user");
    if (user){
      user = JSON.parse(user);
      APIAddFavoriteItems({
        uid:user.id,
        itemId:item.productId
      }).then(resp=>{
        if (resp){
          console.log("收藏成功");
        }
      });
    }
  };

  const removeCollect = () =>{
    let user = localStorage.getItem("user");
    if (user){
      user = JSON.parse(user);
      APIDeleteFavoriteItems({
        uid:user.id,
        itemId:item.productId
      }).then(resp=>{
        if (resp){
          console.log("取消收藏成功");
        }
      });
    }
  };


  const collect = (e) =>{
    e.stopPropagation();
    if (needLogin){
      setShowConnectTips(true);
      return;
    }
    if (!collected){
      addCollect();
      setCollected(true);
    } else {
      removeCollect();
      setCollected(false);
    }
  };

  const getEarn = (price, rate) =>{
    if (price.includes("-")){
      const maxPrice = Number(price.split("-")[1]);
      return `$${(maxPrice * rate).toFixed(2)}`;
    }

    if (price.includes("$")){
      const maxPrice = Number(price.split("$")[1]);
      return `$${(maxPrice * rate).toFixed(2)}`;
    }
    return `$${(Number(price) * rate).toFixed(2)}`;
  };
  return <div className={styles.card_max_wrap}>
    <div onClick={toDetails} className={styles.card_wrap}>
      <div>
        <div className={styles.top}>
          <img  src={ item.alyImage ? item.alyImage : updateImageUrl(item.image, 500, 500)}/>
          <div className={styles.right_wrap_inner}>
            <div>
              <div className={styles.title_1}>Earn per sale</div>
              <div className={styles.title_2}>{getEarn(item.price, Number(item.finishRate) / 100)}</div>
            </div>
            <div>
              <div className={styles.title_1}>Commission</div>
              <div className={styles.title_2}>{item.finishRate}%</div>
            </div>
          </div>
        </div>
        <div className={styles.title_main}>{item.title}</div>
        <div className={styles.total_wrap}>Total sold <div className={styles.sold_num_wrap}>{item.soldNum}</div></div>
        <div onClick={toAddTk} className={styles.add_tk}>{
          loading && <LoadingOutlined></LoadingOutlined>
        } Add to Showcase</div>
      </div>
    </div>
    <div className={styles.hovered}>
      <div onClick={toDetails} className={styles.card_wrap}>
        <div>
          <div className={styles.top}>
            <img  src={ item.alyImage ? item.alyImage : updateImageUrl(item.image, 500, 500)}/>
            <div className={styles.right_wrap_inner}>
              <div>
                <div className={styles.title_1}>Earn per sale</div>
                <div className={styles.title_2}>{getEarn(item.price, Number(item.finishRate) / 100)}</div>
              </div>
              <div>
                <div className={styles.title_1}>Commission</div>
                <div className={styles.title_2}>{item.finishRate}%</div>
              </div>
            </div>
          </div>
          <div className={styles.title_main}>{item.title}</div>
          <div className={styles.total_wrap}>Total sold <div className={styles.sold_num_wrap}>{item.soldNum}</div></div>
          <div onClick={toAddTk} className={styles.add_tk}>{
            loading && <LoadingOutlined></LoadingOutlined>
          } Add to Showcase</div>
        </div>
        <div className={styles.right_wrap_out}>
          <div>
            <div className={styles.flex_row_m}>
              <div className={styles.title_1}>Price</div>
              <div className={styles.title_2}>{item.price}</div>
            </div>
            <div className={styles.flex_row_m}>
              <div className={styles.title_1}>Vs.open collab</div>
              <div className={styles.title_3}>{item.openRate}%</div>
            </div>
          </div>
           <div>
             <div className={styles.flex_row_m}>
               <div className={styles.title_1}>Total sales</div>
               <div className={styles.title_4}>{item.soldAmount}</div>
             </div>
             <img onClick={collect} src={ collected ? "https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-next-asset/liked.png" : "https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-next-asset/like.png"} />
           </div>
        </div>
      </div>
    </div>
      {
       showConnectTips && <ConnectTikTipsModal show={showConnectTips} onCancel={()=>setShowConnectTips(false)}></ConnectTikTipsModal>
       }
  </div>;

};


export default HomeCard;
