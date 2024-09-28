import styles from "./index.module.scss";
import React, {useEffect, useState} from "react";
import {Carousel, message} from "antd";
import ProductPrice from "@/components/ProductPrice";
import ProductPrice2 from "@/components/ProductPrice2";
import SizeBox from "@/components/SizeBox";
import {useRouter} from "next/router";
import {APIGetProductInfo} from "@/api";
import {isMobile} from "@/utils/action";
import copy from 'copy-to-clipboard';
const Product = ({productId}) =>{

  const router = useRouter();

  const [product, setProduct] = useState();

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
    getDetails();
  }, []);

  const toAddTk = (e) =>{
    e.stopPropagation();

    if (product?.url){
      if (isMobile()){
        window.open(product?.url, "_blank");
      } else {
        copy(product?.url);
        message.success("Copy link successfully, please open it with a browser on your mobile device");
      }
    }

  };

  return <div className={styles.product_wrap}>
    <Carousel afterChange={onChange}>
      <div className={styles.top_img_wrap}>
        <img
          src={product?.image ?? ""}
          alt='Image'
          className={styles.rcImage}
        />
      </div>
    </Carousel>
    <ProductPrice price={product?.price} rate={product?.finishRate}></ProductPrice>
    <ProductPrice2 tkRate={product?.openRate} usRate={product?.finishRate}></ProductPrice2>
    <div className={styles.product_des_wrap}>
      {
        product?.title
      }
    </div>
    <SizeBox w={"100%"} h={10} bgColor={"rgb(241 243 249)"}></SizeBox>
    {/* <div className={styles.product_des_wrap}>*/}
    {/*  <h3>Content brief:</h3>*/}
    {/*  <div>*/}
    {/*    1.VOLUMIZING SHAMPOO revives your strands into a thick, voluminous and healthy look. Blended with Biotin for fuller looking hair, vegan collagen to support healthy hair growth, and superfruits elderberry and restoring plum oil to protect strands from damage.*/}
    {/*    2.STRENGTHENING CONDITIONER transforms limp, dry hair into full, rich, voluminous locks. This rich conditioner is packed with repairing biotin, growth and volume promoting collagen, restoring and lengthening elderberry and nourishing plum oil.*/}
    {/*  </div>*/}
    {/* </div>*/}
    <div className={styles.bottom_wrap}>
      <div className={styles.btn}>
        <div onClick={toAddTk} className={styles.btnInner}>Add to Showcase</div>
      </div>
    </div>
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
