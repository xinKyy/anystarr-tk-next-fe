import styles from "./index.module.scss";
import React, {useEffect, useState} from "react";
import {Button, Carousel, Image, message, Skeleton} from "antd";
import ProductPrice from "@/components/ProductPrice";
import ProductPrice2 from "@/components/ProductPrice2";
import ProductModal from "@/components/ProductModal";
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
  const [product, setProduct] = useState({
    "productId": "1729394749048132040",
    "createTime": "2024-06-25T19:02:15.638+00:00",
    "updateTime": "2024-11-27T17:28:49.413+00:00",
    "isDelete": 0,
    "title": "Women's Solid Ribbed Long Sleeve Second-skin Feel Tight-fitting Playsuit Tummy Control Jumpsuit for Fall, Workout Ribbed Bodycon Jumpsuit, Sports Jumpsuits for Women, Running Outdoor Outfits, One-piece Yoga Suit, unitard bodysuit",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8d7b62a0a8d14f20bd50ee6cffec1d53~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$14.16 - 38.15",
    "soldNum": 450869,
    "isApply": 1,
    "openRate": "12.0",
    "finishRate": "18",
    "lastTime": "2024-11-27T21:58:46.840+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpO5ffTx8XF",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "172006.52",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0a710ef21dc749cfaa6351ecc7b8bfce%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a81d2443079a4da58515b4bbeaab0dc3~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/9a03cb7e2292427aba7369875615bcba~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b9a5d5d559c14a5da7dcf8657a9c473e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/52ca10383bb6410488b65755a9417340~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p19-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4ed0e0dcd46544238d08fb678d7bf3c2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/862afc2ce01146fd8f612c9973b8644b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f180d86f41b04a349c0504d437bcde45~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p19-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/66473de8898047dd8325619e14a9f8b8~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c387d9910f244200b279143ca88b66de~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8d7b62a0a8d14f20bd50ee6cffec1d53%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/be32005aa02f44a09c838f52ef544ef6%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/839b1be2f7044824aa7f5e1893c0b754%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8ee56b15efad4b6cb51163cbbc727b8b%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/19368472ac784b71bb5ea80e811cd49a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/99ff969783ee4ffb85a551ab41938ba5%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3a4bc33e168e4515b2b02793b531d051%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/efc74e8884934e548e8ffff9f0d9c9cf%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/66473de8898047dd8325619e14a9f8b8%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  });
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
  const [product, setProduct] = useState({
    "productId": "1729394749048132040",
    "createTime": "2024-06-25T19:02:15.638+00:00",
    "updateTime": "2024-11-27T17:28:49.413+00:00",
    "isDelete": 0,
    "title": "Women's Solid Ribbed Long Sleeve Second-skin Feel Tight-fitting Playsuit Tummy Control Jumpsuit for Fall, Workout Ribbed Bodycon Jumpsuit, Sports Jumpsuits for Women, Running Outdoor Outfits, One-piece Yoga Suit, unitard bodysuit",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8d7b62a0a8d14f20bd50ee6cffec1d53~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$14.16 - 38.15",
    "soldNum": 450869,
    "isApply": 1,
    "openRate": "12.0",
    "finishRate": "18",
    "lastTime": "2024-11-27T21:58:46.840+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpO5ffTx8XF",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "172006.52",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0a710ef21dc749cfaa6351ecc7b8bfce%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a81d2443079a4da58515b4bbeaab0dc3~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/9a03cb7e2292427aba7369875615bcba~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b9a5d5d559c14a5da7dcf8657a9c473e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/52ca10383bb6410488b65755a9417340~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p19-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4ed0e0dcd46544238d08fb678d7bf3c2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/862afc2ce01146fd8f612c9973b8644b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f180d86f41b04a349c0504d437bcde45~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p19-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/66473de8898047dd8325619e14a9f8b8~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c387d9910f244200b279143ca88b66de~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8d7b62a0a8d14f20bd50ee6cffec1d53%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/be32005aa02f44a09c838f52ef544ef6%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/839b1be2f7044824aa7f5e1893c0b754%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8ee56b15efad4b6cb51163cbbc727b8b%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/19368472ac784b71bb5ea80e811cd49a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/99ff969783ee4ffb85a551ab41938ba5%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3a4bc33e168e4515b2b02793b531d051%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/efc74e8884934e548e8ffff9f0d9c9cf%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/66473de8898047dd8325619e14a9f8b8%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  });
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
    {/* 模态框 */}
    <ProductModal />
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
