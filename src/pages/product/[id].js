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
    "productId": "1729412714656469506",
    "createTime": "2024-07-03T07:19:40.555+00:00",
    "updateTime": "2024-12-02T05:44:37.952+00:00",
    "isDelete": 0,
    "title": "Men's Solid Pocket Long Sleeve Fuzzy Hoodie, Loose Casual Hooded Sweatshirt for Fall, Fall Outfits 2024, Fall Drippy Outfits, 2000s Clothes, Going Out Outfit, Cozy Fall Outfits, Essential Hoodies, Hoodies for Men, Fall outfits, Fallfreshness, 90s Clothes",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e68f2a0d07094d6a91b98676614db4c3~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$41.79 - 75.19",
    "soldNum": 17932,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "10.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T22:34:41.384+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpp4XQfhEbz",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "13483.07",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/826b3fd68e8146e490ede42ec39f02c3%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/174146c5648b4f32b0fdcaa1da339629~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/86e356d172cc4452853979bd53076b39~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c113463467de40359bdf6cbc0e39c2bc~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3e50ef5c9fcc4894bbaf8c5ff2e32ea3~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/134f71fe91c14257b4a7d336284ef61a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/36834e955d58421fbaf81961ee443830~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7fee3c7d0d63486c9c3537f179ce3fad~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/201bc8fc981147d18575aa86b2954b5a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b3d18ed0cf01427d82bd7d689a6710e7~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/174146c5648b4f32b0fdcaa1da339629%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/86e356d172cc4452853979bd53076b39%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c113463467de40359bdf6cbc0e39c2bc%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3e50ef5c9fcc4894bbaf8c5ff2e32ea3%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/134f71fe91c14257b4a7d336284ef61a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/36834e955d58421fbaf81961ee443830%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/7fee3c7d0d63486c9c3537f179ce3fad%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/201bc8fc981147d18575aa86b2954b5a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/b3d18ed0cf01427d82bd7d689a6710e7%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 1,
    "isUpEs": 0,
    "sortValue": 0.1176,
    "manualFactors": 1,
    "earnPer": "13.530000",
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
        setCollect(resp.data.product.collect);
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
