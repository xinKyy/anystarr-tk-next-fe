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
    <ProductDetails productId={productId}/>
  </div>;

};

const ProductDetails = ({productId}) =>{
  const [product, setProduct] = useState({
    "productId": "1729463881013760427",
    "createTime": "2024-06-25T23:14:53.011+00:00",
    "updateTime": "2024-12-02T11:47:29.084+00:00",
    "isDelete": 0,
    "title": "Wireless Headphones with Built-in Microphone, Electronic Audio Earbuds Wireless Noise Cancellation Headphones for Fall, Foldable Gaming Headset for Phones, Computers, MP3, Fun Summer Gift, Wireless Earbuds",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/58f5b6e1cb4a4369b9193ab911823d86~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$16.91",
    "soldNum": 79532,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-02T23:52:29.326+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AInKTyDXDirv",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "1344886.12",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/70fdfe7f03034169917cab6aa38fc914%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/58f5b6e1cb4a4369b9193ab911823d86~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a8922a9dc298416e8d69454dff780513~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0d9ed6f104fa416fa7f897d11be68858~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ed69ca98a0474a228065364298ad38b4~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1b604c4539c94c9780048f0c96e6c864~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/67a62ff3c8a143a69063715a18323c37~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/15161bce95814a8394836f9805857cbb~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ff09286f07d34220aeeb731c7cc48ea1~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/bf54f1d27ce4423a9921435839f5c427~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/58f5b6e1cb4a4369b9193ab911823d86%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a8922a9dc298416e8d69454dff780513%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0d9ed6f104fa416fa7f897d11be68858%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ed69ca98a0474a228065364298ad38b4%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/1b604c4539c94c9780048f0c96e6c864%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/67a62ff3c8a143a69063715a18323c37%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/15161bce95814a8394836f9805857cbb%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ff09286f07d34220aeeb731c7cc48ea1%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/bf54f1d27ce4423a9921435839f5c427%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 11,
    "isUpEs": 1,
    "sortValue": 6.8454,
    "manualFactors": 1,
    "earnPer": "3.040000",
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
        setCollect(resp.data.collect);
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
    if (!price) return "--";
    if (price?.includes("-")){
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
          <div className={styles.back_wrap}>
            <BackBtn></BackBtn>
          </div>
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
              <div className={styles.light_high}>${getEarn(product.price, Number(product.finishRate) / 100)}</div>
              <div>Earn per sale</div>
            </div>
            <div className={styles.row_item}>
              <div className={styles.normal_wrap}>${product.price}</div>
              <div>Price</div>
            </div>
            <div className={styles.row_item}>
              <div className={styles.normal_wrap}>${product.soldAmount}</div>
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
