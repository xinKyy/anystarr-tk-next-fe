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
  return <div>
    <div className={styles.back_wrap}>
      <BackBtn></BackBtn>
    </div>
    <ProductDetails productId={productId}/>
  </div>;

};

const ProductDetails = ({productId}) =>{
  const [product, setProduct] = useState({
    "productId": "1729541559560212791",
    "createTime": "2024-08-06T18:30:48.133+00:00",
    "updateTime": "2024-11-30T14:15:49.514+00:00",
    "isDelete": 0,
    "title": "Women's Plain Button Front Ribbed Tank Top, Tank Tops for Women, Casual Sleeveless Round Neck Top for Daily Wear, Ladies Clothes for Fall, Fall Outfits, Fallfreshness Clothes,  Birthday Gifts",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e2dcbd9b23564b3f84a9b3e8fafdad59~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$7.14 - 29.24",
    "soldNum": 20107,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "10.0",
    "finishRate": "18.0",
    "lastTime": "2024-11-30T22:26:16.703+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "5879.29",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/45c66c92fb064ceb9a5d46e7b03f28a1%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e2dcbd9b23564b3f84a9b3e8fafdad59~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6a51317133ba46658bd38b8beb2184d2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/23e83bd1bcd44068ade28e46dc8ba47a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4f260973af39438ca6ee3e2b7cd028c7~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d36d2f2528da4e33a03f1b2189cf21aa~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4290d36471b843938977215ca36f4882~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/50661c04bd334cbaa4b095725a174928~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a7ce86181d6f46ac8e8a4f2cdd09c7eb~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4ccd7ba41ad143fba89852cbee79356f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/e2dcbd9b23564b3f84a9b3e8fafdad59%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/6a51317133ba46658bd38b8beb2184d2%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/23e83bd1bcd44068ade28e46dc8ba47a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/4f260973af39438ca6ee3e2b7cd028c7%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d36d2f2528da4e33a03f1b2189cf21aa%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/4290d36471b843938977215ca36f4882%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/50661c04bd334cbaa4b095725a174928%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a7ce86181d6f46ac8e8a4f2cdd09c7eb%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/4ccd7ba41ad143fba89852cbee79356f%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": null,
    "isUpEs": 1,
    "sortValue": 2.9802,
    "manualFactors": 1,
    "earnPer": "5.260000",
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

    <ProductModal  />
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
