import styles from "./index.module.scss";
import SizeBox from "@/components/SizeBox";
import LoginModal from "@/components/LoginModal";
import {useState} from "react";

const AnystarrHome = () =>{

  const [openConnectModal, setOpenConnectModal] = useState(false);
  return <div className={styles.home_page}>
    <div className={styles.header}>
      <div className={styles.header_content}>
        <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-logo.png"} />
        <div className={styles.item_wrap}>
          <a href={"https://anystarr.com/"}>
            <div className={styles.items}>Home</div>
          </a>
          <a href={"/influencers-2/"}>
            <div className={styles.items}>Influencers</div>
          </a>
          <a href={"/beta"}>
            <div className={styles.items}>TikTok</div>
          </a>
          <SizeBox w={20}></SizeBox>
          <div onClick={()=>setOpenConnectModal(true)} className={"link_wallet"}>
            Connect Tiktok
          </div>
        </div>
      </div>
    </div>
    <LoginModal open={openConnectModal} onCancel={()=>setOpenConnectModal(false)}></LoginModal>
    <div className={styles.content_img_wrap}>
      <div className={styles.bg_image_wrap}></div>
      <div className={styles.title_1}>
        The World's Leading One-stop influencer Platform
      </div>
      <div className={styles.title_2}>
        We are helping to make the most of Influencer Marketing while bringing value to brands, creators and communities around the globe.
      </div>
      <a href={"https://app.anystarr.com/en"}>
        <div className={styles.btn}>
          View Campaigns
        </div>
      </a>
    </div>

    <SizeBox h={80}></SizeBox>

    <div className={styles.content_top_1}>
      <div className={styles.left}>
        <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/top1.jpg"} />
      </div>
      <div className={styles.right}>
        <div className={styles.t1}>Welcome to anyStarr</div>
        <SizeBox h={20}></SizeBox>
        <div>Looking to collaborate with brands, grow your audience and unlock celebrity rewards but don’t know where to start?</div>
        <SizeBox h={20}></SizeBox>
        <div>anyStarr is a place where you can start monetising your influence as easy as 3 steps:</div>
        <SizeBox h={20}></SizeBox>
        <div>
          <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/01-icon.jpg"}/>
          <div>Sign up and choose a campaign with your favourite brand</div>
        </div>
        <SizeBox h={20}></SizeBox>
        <div>
          <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/02-icon.jpg"}/>
          <div>Sign up and choose a campaign with your favourite brand</div>
        </div>
        <SizeBox h={20}></SizeBox>
        <div>
          <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/03-icon.jpg"}/>
          <div>Sign up and choose a campaign with your favourite brand</div>
        </div>

        <SizeBox h={20}></SizeBox>

        <a href={"https://app.anystarr.com/en/register_pre"}>
          <div className={styles.c_btn}>
            GET STARTED
          </div>
        </a>
      </div>
    </div>
    <SizeBox h={100}></SizeBox>
    <div className={styles.content_top_1}>
      <div className={`${styles.right} ${styles.left_r}`}>
        <div className={styles.t1}>Our Expertise</div>
        <SizeBox h={20}></SizeBox>
        <h1>Built for Influencers, <br/>
          By Influencers</h1>
        <SizeBox h={20}></SizeBox>
        <div>We are helping to make the most of Influencer Marketing while bringing value to brands, creators and communities around the globe.</div>
        <SizeBox h={20}></SizeBox>
        <a href={"https://app.anystarr.com/"}>
          <div className={styles.c_btn}>
            VIEW CAMPAIGNS
          </div>
        </a>

      </div>
      <div className={styles.left}>
        <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/top2.jpg"} />
      </div>
    </div>
    <SizeBox h={100}></SizeBox>
    <div className={styles.content_top_1}>
      <div className={styles.left}>
        <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/top3.jpg"} />
      </div>
      <div className={styles.right}>
        <div className={styles.t1}>Our Community</div>
        <SizeBox h={20}></SizeBox>
        <h1>At anyStarr, anyone can be a star!</h1>
        <SizeBox h={20}></SizeBox>
        <div>We have a big inclusive community of influencers of all kinds: nano influencers, micro influencers, macro influencers, mid-tier and mega influencers.</div>
        <SizeBox h={20}></SizeBox>
        <div>We value each and every influencer and want to be able to provide a perfect proposal for everyone to monetise your influence and collaborate with brands that you love – all around the world!</div>
        <SizeBox h={20}></SizeBox>
        <div>We work with France, Spain, Brazil, Singapore, China – and many more!</div>
        <SizeBox h={20}></SizeBox>
        <div>We always keep the quality and honesty up in everything we do, so you can rely on us !</div>
        <SizeBox h={20}></SizeBox>
        {/* <div className={styles.c_btn}>*/}
        {/*  ANYSTARR FOR INFLUENCERS*/}
        {/* </div>*/}
      </div>
    </div>
    <SizeBox h={100}></SizeBox>
    <div className={styles.section}>
      <h1>What Influencers Say About Us</h1>
      <SizeBox h={50}></SizeBox>
      <div>
        <div className={styles.comments_wrap}>
          <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/bottom1.png"}/>
          <div>
            <div><span>@IvanBega:</span></div>
            <SizeBox h={10}></SizeBox>
            <div>
              "Quality project to benefit new influencers. I am delighted to work with anyStarr.
              How about you?"
            </div>
          </div>
        </div>
        <SizeBox h={10}></SizeBox>
        <div className={styles.comments_wrap}>
          <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/bottom2.png"}/>
          <div>
            <div><span>@_noeliafeernandez:</span></div>
            <SizeBox h={10}></SizeBox>
            <div>
              " Thank you very much for your close attention during campaigns, quick solutions to my doubts and quality assistance."
            </div>
          </div>
        </div>
        <SizeBox h={10}></SizeBox>
        <div className={styles.comments_wrap}>
          <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/bottom2.png"}/>
          <div>
            <div><span>@paula.encinas.moya:</span></div>
            <SizeBox h={10}></SizeBox>
            <div>
              "Very good team work, perfect treatment, attentive and safe."
            </div>
          </div>
        </div>
      </div>
      <SizeBox h={50}></SizeBox>
      {/* <div className={styles.c_btn}>*/}
      {/*  VIEW ALL CASE STUDIES*/}
      {/* </div>*/}
    </div>
    <SizeBox h={50}></SizeBox>
    <div className={styles.bottom_wrap}>
      <div className={styles.content}>
        <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-logo.png"} />

        <div className={styles.right_wrap}>

          <div className={styles.left}>
            <div className={styles.tt_1}>GET STARTED</div>
            <SizeBox h={30}></SizeBox>
            <a href={"/influencers-2/"}>
              <div>Influencers</div>
            </a>
            <SizeBox h={15}></SizeBox>
            <a href={"https://app.anystarr.com/shoppingInfo"}>
              商家合作
            </a>
            <SizeBox h={15}></SizeBox>
            {/* <div>Blog</div>*/}
            <a href={"https://app.anystarr.com/en"}>
              <div>Platform</div>
            </a>
          </div>


          <div className={styles.right}>
            <div className={styles.tt_1}>HELP AND LEGAL</div>
            <SizeBox h={30}></SizeBox>
            <a href={"/Terms_and_Conditions_anyStarr.html"}><div>Terms and conditions</div></a>
            <SizeBox h={15}></SizeBox>
            <a href={"/privacy_policy.html"}><div>Privacy Policy</div></a>
          </div>

        </div>

      </div>
    </div>
  </div>;
};


export default AnystarrHome;
