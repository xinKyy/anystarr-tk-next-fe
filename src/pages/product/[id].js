import styles from "./index.module.scss";
import React, {useEffect, useState} from "react";
import {Button, Carousel, Image, message, Skeleton} from "antd";
import {APIAddFavoriteItems, APIDeleteFavoriteItems, APIGetLinkByPid, APIGetProductInfo} from "@/api";
import {isMobile} from "@/utils/action";
import copy from 'copy-to-clipboard';
import BackBtn from "@/components/BackBtn";
import ConnectTikTipsModal from "@/components/connectTikTipsModal";
import {useSelector} from "react-redux";
import useLogin from "@/hooks/useLogin";
import {LoadingOutlined} from "@ant-design/icons";
import AddShowCaseStepModal from "@/components/ProductModal";

function updateImageUrl(url, w, h) {
  if (!url) return "";
  return url.replace(/(\d+):(\d+)/, `${w}:${h}`);
}


const Product = ({productId}) =>{
  return <div>
    <div className={styles.back_wrap}>
      <BackBtn></BackBtn>
    </div>
    <ProductDetails productId={productId}/>
  </div>;

};

const ProductDetails = ({productId}) =>{
  const [product, setProduct] = useState({
    "productId": "1729418818380599419",
    "createTime": "2024-06-27T03:48:29.543+00:00",
    "updateTime": "2024-11-30T04:16:38.949+00:00",
    "isDelete": 0,
    "title": "Individual Lashes Kit, 1 Box DIY Lash Extensions Eyelashes with Tweezers & Bond & Seal and Lash Remover, Curly Fake Lashes Set for Women Makeup, Lash Clusters, Lashes Extension Kit, Makeup Set, Christmas, Christmas Gift",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1f56101da2ef4e91abd409eaaf4d4013~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$11.64 - 12.91",
    "soldNum": 44103,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "10.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-30T23:58:57.888+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIr0qRpVldfX",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "5693.70",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/677b6b4ed0bf4048a4629488285b0533%7Etplv-aphluv4xwc-origin-jpeg.jpeg%3Ffrom%3D1345521523",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1f56101da2ef4e91abd409eaaf4d4013~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/acbfd8a1d7f74a7cb3e32d4f67f04b8c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/dc03da34fc79440e8151c3f306dad0a7~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1ff70bcd4bcf40b785a35b9d04ac906d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/030a7646302b45968050e4fcfbcbfffc~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/629d1002f71b47b58fc7772ace02ad8f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/cc97090ad430458a9ecf7a776064152d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7933dc61634848838b8632310b3c687c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/da20cadb21794f679ccea7faaef8964f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/1f56101da2ef4e91abd409eaaf4d4013%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/acbfd8a1d7f74a7cb3e32d4f67f04b8c%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/dc03da34fc79440e8151c3f306dad0a7%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/1ff70bcd4bcf40b785a35b9d04ac906d%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/030a7646302b45968050e4fcfbcbfffc%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/629d1002f71b47b58fc7772ace02ad8f%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/cc97090ad430458a9ecf7a776064152d%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/7933dc61634848838b8632310b3c687c%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/da20cadb21794f679ccea7faaef8964f%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": null,
    "isUpEs": 1,
    "sortValue": 2.9508,
    "manualFactors": 1,
    "earnPer": "1.810000",
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

  const [showCase, setShowCase] = useState(false);
  const [productLink, setProductLink] = useState("");

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
            setShowCase(true);
          } else {
            setProductLink(url);
            setShowCase(true);
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
        setProductLink(url);
        setShowCase(true);
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

    {
      product ?     <div className={styles.product_detail_wrap}>
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
                <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-next-asset/anystarr-cion.png"}></img>
                <div className={styles.text_1}>Commission</div>
                <div className={styles.high_light}>{product.finishRate}%</div>
                <div className={styles.text_2}>Commission Rate</div>
              </div>
            </div>
            <img className={styles.vs_icon} src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-next-asset/vs_icon.png"} />
            <div className={styles.vs_right}>
              <div>
                <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-next-asset/tk-icon.png"}></img>
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
             <div className={styles.item_wrap}>
              <div className={styles.title_1}>Sold<span>(last 7 days)</span></div>
              <div>{product.day7SoldNum ?? "--"}</div>
             </div>
          </div>

          <div className={styles.btn_wrap}>
            {
              collect ? <div onClick={opCollect} className={styles.remove_collection}>
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
      </div> : <div className={styles.product_wrap}><Skeleton /></div>
    }

    <AddShowCaseStepModal visible={showCase} link={productLink}  onCancel={()=>setShowCase(false)}  />
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
