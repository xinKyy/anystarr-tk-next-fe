import styles from "./index.module.scss";
import React, {useEffect, useState} from "react";
import {Button, Carousel, Image, message, Skeleton} from "antd";
import ProductPrice from "@/components/ProductPrice";
import ProductPrice2 from "@/components/ProductPrice2";
import SizeBox from "@/components/SizeBox";
import {useRouter} from "next/router";
import {APIAddFavoriteItems, APIDeleteFavoriteItems, APIGetProductInfo} from "@/api";
import {isMobile} from "@/utils/action";
import copy from 'copy-to-clipboard';
import BackBtn from "@/components/BackBtn";
import ConnectTikTipsModal from "@/components/connectTikTipsModal";
import {useSelector} from "react-redux";

function updateImageUrl(url, w, h) {
  if (!url) return "";
  return url.replace(/(\d+):(\d+)/, `${w}:${h}`);
}


const Product = ({productId}) =>{

  const router = useRouter();

  const [product, setProduct] = useState();
  const [mobile, setMobile] = useState(false);
  const [collect, setCollect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConnectTips, setShowConnectTips] = useState(false);
  const userInfo = useSelector(state => state.home.userInfo.userInfo);
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

    if (!userInfo.email){
      setShowConnectTips(true);
      return;
    }

    if (product?.url){
      if (isMobile()){
        window.open(product?.url, "_blank");
      } else {
        copy(product?.url);
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
    if (!userInfo.email){
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
      product ? <div className={styles.product_wrap}>
        <Carousel className={styles.top_img_wrap} afterChange={onChange}>
          <img
            src={updateImageUrl(product?.image, 500, 600)}
            alt='Image'
            className={styles.rc_image}
          />
        </Carousel>
        <div>
          <ProductPrice price={product?.price} rate={product?.finishRate}></ProductPrice>
          <ProductPrice2 tkRate={product?.openRate} usRate={product?.finishRate}></ProductPrice2>
          <div className={styles.product_des_wrap}>
            {
              product?.title
            }
          </div>
          <div className={styles.pc_btn}>
            <Button className={`${ collect ? styles.cancel_collect : styles.fav_btn}`} loading={loading} onClick={opCollect}>
              {
                collect ? "Cancel collection" : "Add to Favorites"
              }
            </Button>
            <SizeBox w={20}></SizeBox>
            <div className={styles.btn}>
              <div onClick={toAddTk} className={styles.btnInner}>Add to Showcase</div>
            </div>
          </div>
        </div>
        {/* <div className={styles.product_des_wrap}>*/}
        {/*  <h3>Content brief:</h3>*/}
        {/*  <div>*/}
        {/*    1.VOLUMIZING SHAMPOO revives your strands into a thick, voluminous and healthy look. Blended with Biotin for fuller looking hair, vegan collagen to support healthy hair growth, and superfruits elderberry and restoring plum oil to protect strands from damage.*/}
        {/*    2.STRENGTHENING CONDITIONER transforms limp, dry hair into full, rich, voluminous locks. This rich conditioner is packed with repairing biotin, growth and volume promoting collagen, restoring and lengthening elderberry and nourishing plum oil.*/}
        {/*  </div>*/}
        {/* </div>*/}
        <div className={styles.bottom_wrap}>
          <Button className={`${ collect ? styles.cancel_collect : styles.fav_btn}`} loading={loading} onClick={opCollect}>
            {
              collect ? "Cancel collection" : "Add to Favorites"
            }
          </Button>
          <SizeBox w={20}></SizeBox>
          <div className={styles.btn}>
            <div onClick={toAddTk} className={styles.btnInner}>Add to Showcase</div>
          </div>
        </div>
      </div> : <div className={styles.product_wrap}><Skeleton /></div>
    }
  </div>;

};


export async function getServerSideProps({ req, res, locale, params }) {
  return {
    props: {
      productId:params.id
    }
  };
}



export default Product;
