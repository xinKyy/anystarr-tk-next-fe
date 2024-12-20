import React, {useEffect, useState} from 'react';
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
import {LoadingOutlined} from "@ant-design/icons";
import AddShowCaseStepModal from "@/components/ProductModal"; // 假设你将 SCSS 文件命名为 YourStyles.module.scss
function updateImageUrl(url, w, h) {
  if (!url) return "";
  return url.replace(/(\d+):(\d+)/, `${w}:${h}`);
}

let currentPid = "";

const HomeCard = ({currentExt, setCurrentExt, item, fromMyLike, checkItem, checked}) => {

  return <CardComp setCurrentExt={setCurrentExt} currentExt={currentExt} item={item} fromMyLike={fromMyLike} checkItem={checkItem} checked={checked} ></CardComp>;

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


const CardComp = ({currentExt, setCurrentExt, item, fromMyLike, checkItem, checked}) =>{
  const router = useRouter();
  const [collected, setCollected] = useState(item.collect);
  const { needLogin } = useLogin();
  const [showConnectTips, setShowConnectTips] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showCase, setShowCase] = useState(false);
  const [productLink, setProductLink] = useState("");

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
            setProductLink(url);
            setShowCase(true);
          }
        } else {
          message.info("Sorry, The product has been taken down!");
        }
      }).finally(()=>{
        setLoading(false);
      });
    } else {
      const url = item.url;
      if (isMobile()){
        window.open(url, "_blank");
      } else {
        setProductLink(url);
        setShowCase(true);
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
    if (!price) return "--";
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
    <AddShowCaseStepModal visible={showCase} link={productLink}  onCancel={()=>setShowCase(false)}  />
    <div onClick={toDetails} className={styles.card_wrap}>
      <div>
        <div className={styles.top}>
          <img  src={ item.alyImage ? item.alyImage : updateImageUrl(item.image, 500, 500)}/>
          <div className={styles.right_wrap_inner}>
            <div className={styles.line_h}>
              <div className={styles.title_1}>Earn per sale</div>
              <div className={styles.title_2}>${item?.earnPer ?? "--"}</div>
            </div>
            <div>
              <div className={styles.title_1}>Commission</div>
              <div className={styles.title_2}>{item.finishRate}%</div>
            </div>
          </div>
        </div>
        <div className={styles.title_main}>{item.title}</div>
        <div className={styles.total_wrap}>Total sold <div className={styles.sold_num_wrap}>{item.soldNum}</div></div>
        <div className={styles.flex_center}>
          <div onClick={toAddTk} className={styles.add_tk}>{
            loading && <LoadingOutlined></LoadingOutlined>
          } Add to Showcase</div>
          {
            fromMyLike && <div onClick={(e)=>{
              e.stopPropagation();
              checkItem(item.productId);
            }} className={`${styles.select_icon} ${checked ? styles.active : ""}`}></div>
          }
          <img onClick={(e)=>{
            e.stopPropagation();
            currentPid = item.productId;
            setCurrentExt(item.productId);
          }} className={styles.ext_icon} src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-next-asset/ext_icon.png"} />
        </div>
      </div>
    </div>
    <div className={`${styles.hovered} ${currentExt === item.productId ? styles.hovered_m : ""}`}>
      <div onClick={toDetails} className={styles.card_wrap}>
        <div>
          <div className={styles.top}>
            <img  src={ item.alyImage ? item.alyImage : updateImageUrl(item.image, 500, 500)}/>
            <div className={styles.right_wrap_inner}>
              <div className={styles.line_h}>
                <div className={styles.title_1}>Earn per sale</div>
                <div className={styles.title_2}>${item?.earnPer ?? "--"}</div>
              </div>
              <div className={styles.line_h}>
                <div className={styles.title_1}>Commission</div>
                <div className={styles.title_2}>{item.finishRate}%</div>
              </div>
            </div>
          </div>
          <div className={styles.title_main}>{item.title}</div>
          <div className={styles.total_wrap}>Total sold <div className={styles.sold_num_wrap}>{item.soldNum}</div></div>
          <div className={styles.flex_center}>
            <div onClick={toAddTk} className={styles.add_tk}>{
              loading && <LoadingOutlined></LoadingOutlined>
            } Add to Showcase</div>
            {
              fromMyLike && <div onClick={(e)=>{
                e.stopPropagation();
                checkItem(item.productId);
              }} className={`${styles.select_icon} ${checked ? styles.active : ""}`}></div>
            }
            <img onClick={(e)=>{
              e.stopPropagation();
              setCurrentExt("");
            }} className={styles.ext_icon} src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-next-asset/ext_icon_r.png"} />
          </div>
        </div>
        <div className={styles.driver}></div>
        <div className={styles.right_wrap_out}>
          <div>
            <div className={`${styles.flex_row_m} ${styles.line_h}`}>
              <div className={styles.title_1}>Price</div>
              <div className={styles.title_2}>{item.price}</div>
            </div>
            <div className={`${styles.flex_row_m} ${styles.line_h}`}>
              <div className={styles.title_1}>Vs.open collab</div>
              <div className={styles.title_3}>{item.openRate}%</div>
            </div>
          </div>
          <div className={styles.center_div_cloumn}>
            <div className={`${styles.flex_row_m} ${styles.line_h}`}>
               <div className={styles.title_1}>Total sales</div>
               <div className={styles.title_4}>${item.soldAmount}</div>
             </div>
             <div style={{marginBottom:"5px"}}>
               <img onClick={collect} src={ collected ? "https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-next-asset/liked.png" : "https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-next-asset/like.png"} />
             </div>
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
