import styles from "./index.module.scss";
import React, {useEffect, useState} from "react";
import {Button, Carousel, Image, message, Skeleton} from "antd";
import ProductPrice from "@/components/ProductPrice";
import ProductPrice2 from "@/components/ProductPrice2";
import SizeBox from "@/components/SizeBox";
import {useRouter} from "next/router";
import {APIAddFavoriteItems, APIDeleteFavoriteItems, APIGetLinkByPid, APIGetProductInfo} from "@/api";
import {isMobile} from "@/utils/action";
import copy from 'copy-to-clipboard';
import BackBtn from "@/components/BackBtn";
import ConnectTikTipsModal from "@/components/connectTikTipsModal";
import {useSelector} from "react-redux";
import useLogin from "@/hooks/useLogin";
import {LoadingOutlined} from "@ant-design/icons";

function updateImageUrl(url, w, h) {
  if (!url) return "";
  return url.replace(/(\d+):(\d+)/, `${w}:${h}`);
}


const Product = ({productId}) =>{
  const [product, setProduct] = useState();
  const [mobile, setMobile] = useState(false);
  const [collect, setCollect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addTkLoading, setAddTkLoading] = useState(false);
  const [showConnectTips, setShowConnectTips] = useState(false);
  const { needLogin } = useLogin();
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const getDetails = () =>{
    APIGetProductInfo({productId:productId}).then(resp=>{
      console.log(resp, "resp");
      if (resp.data.product){
        setProduct(resp.data.product);
      }
    });
  };

  useEffect(()=>{
    setMobile(isMobile());
    getDetails();
  }, []);

  const toAddTk = (e) =>{
    e.stopPropagation();
    window.gtag && window.gtag('event', 'add_to_showcase', {
      'event_category': 'add_to_showcase',
      'event_label': 'add_to_showcase',
      'value': productId,
    });
    // if (needLogin){
    //   setShowConnectTips(true);
    //   return;
    // }

    if (addTkLoading) return;

    if (product?.needApplyLink){
      setAddTkLoading(true);
      APIGetLinkByPid(product.productId).then(resp=>{
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
        setAddTkLoading(false);
      });
    } else {
      const url = product?.url;
      if (isMobile()){
        window.open(url, "_blank");
      } else {
        copy(url);
        message.success("Copy link successfully, please open it with a browser on your mobile device");
      }
    }

  };

  const addCollect = async () =>{
    let user = localStorage.getItem("user");
    if (user){
      user = JSON.parse(user);
      try {
        const res = await APIAddFavoriteItems({
          uid:user.id,
          itemId:productId
        });
        if (res.data.result){
          return ["Successfully added to favorites", null];
        }
        return [null, new Error(res.message)];
      } catch (e){
        return [null, new Error("Network Error")];
      }
    }
    return [null, new Error("Please connect to Tiktok!")];
  };

  const removeCollect = async () =>{
    let user = localStorage.getItem("user");
    if (user){
      user = JSON.parse(user);
      try {
        const res = await APIDeleteFavoriteItems({
          uid:user.id,
          itemId:productId
        });
        if (res.data.result){
          return ["Unsubscribed successfully", null];
        }
        return [null, new Error(res.message)];
      } catch (e){
        return [null, new Error("Network Error")];
      }
    }
    return [null, new Error("Please connect to Tiktok!")];
  };

  const opCollect = async () =>{
    if (needLogin){
      setShowConnectTips(true);
      return;
    }
    if (loading){
      return;
    }
    if (collect){
      setLoading(true);
      const [res, e] = await removeCollect();
      setLoading(false);
      if (e) return message.error(e.message);
      message.success(res);
      setCollect(false);
      return ;
    }
    setLoading(true);
    const [res, e] = await addCollect();
    setLoading(false);
    if (e) return message.error(e.message);
    message.success(res);
    setCollect(true);
  };

  return <div>
    {
      showConnectTips && <ConnectTikTipsModal show={showConnectTips} onCancel={()=>setShowConnectTips(false)}></ConnectTikTipsModal>
    }

    {
      !mobile && <SizeBox h={10}></SizeBox>
    }

    <div className={styles.back_wrap}>
      <BackBtn></BackBtn>
    </div>
    {
      product ? <ProductDetails productId={productId}/> :
        <div className={styles.product_wrap}><Skeleton /></div>
    }
  </div>;

};

const ProductDetails = ({productId}) =>{
  const [product, setProduct] = useState();
  const [mobile, setMobile] = useState(false);
  const [collect, setCollect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addTkLoading, setAddTkLoading] = useState(false);
  const [showConnectTips, setShowConnectTips] = useState(false);
  const { needLogin } = useLogin();
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const getDetails = () =>{
    APIGetProductInfo({productId:productId}).then(resp=>{
      console.log(resp, "resp");
      if (resp.data.product){
        setProduct(resp.data.product);
      }
    });
  };

  useEffect(()=>{
    setMobile(isMobile());
    getDetails();
  }, []);

  const toAddTk = (e) =>{
    e.stopPropagation();
    if (addTkLoading) return;

    if (product?.needApplyLink){
      setAddTkLoading(true);
      APIGetLinkByPid(product.productId).then(resp=>{
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
        setAddTkLoading(false);
      });
    } else {
      const url = product?.url;
      if (isMobile()){
        window.open(url, "_blank");
      } else {
        copy(url);
        message.success("Copy link successfully, please open it with a browser on your mobile device");
      }
    }

  };

  const addCollect = async () =>{
    let user = localStorage.getItem("user");
    if (user){
      user = JSON.parse(user);
      try {
        const res = await APIAddFavoriteItems({
          uid:user.id,
          itemId:productId
        });
        if (res.data.result){
          return ["Successfully added to favorites", null];
        }
        return [null, new Error(res.message)];
      } catch (e){
        return [null, new Error("Network Error")];
      }
    }
    return [null, new Error("Please connect to Tiktok!")];
  };

  const removeCollect = async () =>{
    let user = localStorage.getItem("user");
    if (user){
      user = JSON.parse(user);
      try {
        const res = await APIDeleteFavoriteItems({
          uid:user.id,
          itemId:productId
        });
        if (res.data.result){
          return ["Unsubscribed successfully", null];
        }
        return [null, new Error(res.message)];
      } catch (e){
        return [null, new Error("Network Error")];
      }
    }
    return [null, new Error("Please connect to Tiktok!")];
  };

  const opCollect = async () =>{
    if (needLogin){
      setShowConnectTips(true);
      return;
    }
    if (loading){
      return;
    }
    if (collect){
      setLoading(true);
      const [res, e] = await removeCollect();
      setLoading(false);
      if (e) return message.error(e.message);
      message.success(res);
      setCollect(false);
      return ;
    }
    setLoading(true);
    const [res, e] = await addCollect();
    setLoading(false);
    if (e) return message.error(e.message);
    message.success(res);
    setCollect(true);
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

  return <>
    {
      showConnectTips && <ConnectTikTipsModal show={showConnectTips} onCancel={()=>setShowConnectTips(false)}></ConnectTikTipsModal>
    }
    <div className={styles.product_detail_wrap}>
      <div className={styles.left_wrapper}>
        <Image
          src={ product.alyImage ? product.alyImage : updateImageUrl(product?.image, 700, 700)}
          className={styles.top_img}></Image>
        {/* <div className={styles.swiper_wrap}>*/}
        {/*  <div className={styles.swiper_item}></div>*/}
        {/*  <div className={styles.swiper_item}></div>*/}
        {/*  <div className={styles.swiper_item}></div>*/}
        {/*  <div className={styles.swiper_item}></div>*/}
        {/* </div>*/}
      </div>
      <div className={styles.gap}></div>
      <div className={styles.right_wrapper}>
        <div className={styles.title_wrap}>{product.title}</div>
        <div className={styles.row_wrap}>
          <div className={styles.row_item}>
            <div className={styles.light_high}>{getEarn(product.price, Number(product.finishRate) / 100)}</div>
            <div>Earn per sale</div>
          </div>
          <div className={styles.row_item}>
            <div className={styles.normal_wrap}>{product.price}</div>
            <div>Price</div>
          </div>
          <div className={styles.row_item}>
            <div className={styles.normal_wrap}>{product.soldAmount}</div>
            <div>Total sales</div>
          </div>
        </div>
        <div className={styles.vs_wrap}>
          <div className={styles.vs_left}>
            <div>
              <div></div>
              <div className={styles.text_1}>Commission</div>
              <div className={styles.high_light}>{product.finishRate}%</div>
              <div className={styles.text_2}>Commission Rate</div>
            </div>
          </div>
          <img className={styles.vs_icon} src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-next-asset/vs_icon.png"} />
          <div className={styles.vs_right}>
            <div>
              <div></div>
              <div className={styles.text_1}>vs.open collab</div>
              <div className={styles.gray_text}>{product.openRate}%</div>
              <div className={styles.text_2}>Commission Rate</div>
            </div>
          </div>
        </div>
        <div className={styles.data_wrap}>
          <div className={styles.item_wrap}>
            <div className={styles.title_1}>Total sold</div>
            <div>{product.soldNum}</div>
          </div>
          <div className={styles.item_wrap}>
            <div className={styles.title_1}>Sold<span>(yesterday)</span></div>
            <div>{product.daySoldNum}</div>
          </div>
          {/* <div className={styles.item_wrap}>*/}
          {/*  <div className={styles.title_1}>Sold<span>(last 7 days)</span></div>*/}
          {/*  <div>{product}</div>*/}
          {/* </div>*/}
        </div>

        <div className={styles.btn_wrap}>
          {
            product.collect ? <div onClick={opCollect} className={styles.remove_collection}>
              Uncollections
            </div> : <div onClick={opCollect} className={styles.add_to_collection}>Add to Collection</div>
          }
          <div className={styles.gap}></div>
          <div onClick={toAddTk} className={styles.add_to_showcase}>
            {
              addTkLoading && <LoadingOutlined></LoadingOutlined>
            }
            Add to Showcase
          </div>
        </div>
      </div>
    </div>
  </>;
};


export async function getServerSideProps({ req, res, locale, params }) {
  return {
    props: {
      productId:params.id
    }
  };
}



export default Product;
