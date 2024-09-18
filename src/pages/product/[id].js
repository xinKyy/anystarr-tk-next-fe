import styles from "./index.module.scss";
import React from "react";
import {Carousel} from "antd";
import ProductPrice from "@/components/ProductPrice";
import ProductPrice2 from "@/components/ProductPrice2";
import SizeBox from "@/components/SizeBox";

const Product = () =>{

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return <div className={styles.product_wrap}>
    <Carousel afterChange={onChange}>
      <div className={styles.top_img_wrap}>
        <img
          src='https://p19-oec-ttp.tiktokcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/671058679dac4cb6a2deb499a21d58e5~tplv-omjb5zjo8w-resize-jpeg:2000:2000.jpeg?from=520841845'
          alt='Image'
          className={styles.rcImage}
        />
      </div>
      <div className={styles.top_img_wrap}>
        <img
          src='https://p19-oec-ttp.tiktokcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/72607c6143d749a494173301b4919eb0~tplv-omjb5zjo8w-resize-jpeg:2000:2000.jpeg?from=1826719393'
          alt='Image'
          className={styles.rcImage}
        />
      </div>
      <div className={styles.top_img_wrap}>
        <img
          src='https://p19-oec-ttp.tiktokcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/671058679dac4cb6a2deb499a21d58e5~tplv-omjb5zjo8w-resize-jpeg:2000:2000.jpeg?from=520841845'
          alt='Image'
          className={styles.rcImage}
        />
      </div>
    </Carousel>
    <ProductPrice></ProductPrice>
    <ProductPrice2></ProductPrice2>
    <div className={styles.product_des_wrap}>
      Soapbox Biotin & Superfruit Shampoo & Conditioner Set - Volumizing & Strengthening - Vegan Collagen, Shea Butter, Aloe - Sulfate Free, Paraben Free, Silicone Free, Color Safe, Vegan - 16 oz Each (Pack of 2)
    </div>
    <SizeBox w={"100%"} h={10} bgColor={"rgb(241 243 249)"}></SizeBox>
    <div className={styles.product_des_wrap}>
      <h3>Content brief:</h3>
      <div>
        1.VOLUMIZING SHAMPOO revives your strands into a thick, voluminous and healthy look. Blended with Biotin for fuller looking hair, vegan collagen to support healthy hair growth, and superfruits elderberry and restoring plum oil to protect strands from damage.
        2.STRENGTHENING CONDITIONER transforms limp, dry hair into full, rich, voluminous locks. This rich conditioner is packed with repairing biotin, growth and volume promoting collagen, restoring and lengthening elderberry and nourishing plum oil.
      </div>
    </div>
    <div className={styles.bottom_wrap}>
      <div className={styles.btn}>
        <div className={styles.btnInner}>Add to Showcase</div>
      </div>
    </div>
  </div>

};

export default Product;
