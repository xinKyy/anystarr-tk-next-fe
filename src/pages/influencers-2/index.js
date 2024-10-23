import styles from "./index.module.scss";
import SizeBox from "@/components/SizeBox";

const Home = () =>{


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
          <a href={"https://app.anystarr.com/login"}>
            <div className={styles.items}>Log in</div>
          </a>
          <a href={"https://app.anystarr.com/shoppingInfo"}>
            <div className={styles.items}>商家合作</div>
          </a>
        </div>
      </div>
    </div>

    <div className={styles.inf_top_wrap}>
      <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/inf-gif.gif"} />
      <SizeBox w={90}></SizeBox>
      <div>
        <h1>anyStarr is where</h1>
        <h1>Brand Meet Influencer to Create Stories Together</h1>
        <p>We are so proud to announce that we work with all aspiring influencers! Do not allow a small following to stop you from applying. We offer different opportunities to all kinds of influencers regardless of their follower sizes across the globe. </p>
        <a href={"https://app.anystarr.com/register_pre"}>
          <div className={styles.c_btn}>
            APPLY NOW
          </div>
        </a>
      </div>
    </div>

    <SizeBox h={80}></SizeBox>

    <div className={styles.content_top_1}>
      <div className={`${styles.right} ${styles.left_r}`}>
        <SizeBox h={70}></SizeBox>
        <div className={styles.t1}><h1>Endorse</h1></div>
        <SizeBox h={20}></SizeBox>
        <h1>Your Favourite Brands</h1>
        <div>Connect you directly to over a hundred brands. The brands want to create stories together with influencers like you – who the consumers trust your genuine advice on products. </div>
        <SizeBox h={20}></SizeBox>
      </div>
      <div className={styles.left}>
        <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/inf-1.jpg"} />
      </div>
    </div>
    <SizeBox h={100}></SizeBox>
    <div className={styles.content_top_1}>
      <div className={styles.left}>
        <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/inf-2.jpg"} />
      </div>
      <div className={styles.right}>
        <SizeBox h={50}></SizeBox>
        <div className={styles.t1}><h1>Grow Your Followers</h1></div>
        <SizeBox h={20}></SizeBox>
        <div>By working with hundreds of global brands as part of the exciting campaigns (eg. free sample campaign, affiliate campaign, fix commission campaign, etc), you can reach out to a larger group of people and expanding your influence. </div>
      </div>
    </div>
    <SizeBox h={100}></SizeBox>
    <div className={styles.content_top_1}>
      <div className={`${styles.right} ${styles.left_r}`}>
        <SizeBox h={70}></SizeBox>
        <div className={styles.t1}>
          <h1>Earnings Withdrawal</h1>
        </div>
        <SizeBox h={20}></SizeBox>
        <div>
          We never take a percentage and it is totally free to use our platform. you will gain respect for your authentic content made from passion and creativity. Once it goes live, you’ll be paid!
        </div>
        <SizeBox h={20}></SizeBox>
      </div>
      <div className={styles.left}>
        <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/inf-3.jpg"} />
      </div>
    </div>
    <SizeBox h={100}></SizeBox>
    <div className={styles.content_top_1}>
      <div className={styles.left}>
        <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/inf-4.jpg"} />
      </div>
      <div className={styles.right}>
        <SizeBox h={50}></SizeBox>
        <div className={styles.t1}><h1>Mobile Live Chat Support</h1></div>
        <SizeBox h={20}></SizeBox>
        <div>We care about our influencers and commit to enhance the experience of influencers who collaborating with brands. Our live chat support team will be here to assist with your onboarding and campaign execution whenever you need support. </div>
      </div>
    </div>
    <SizeBox h={100}></SizeBox>

    <div className={styles.inf_section_wrap}>

      <div className={styles.title}>Welcome to <span>anyStarr</span></div>
      <SizeBox h={20}></SizeBox>
      <div className={styles.sub_title}>Start monetising your influence as easy as 3 steps:</div>
      <SizeBox h={20}></SizeBox>

      <div className={styles.item_wrap}>
        <div>
          <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/01-icon.jpg"} />
          <div className={styles.title}>Sign Up & Choose a Campaign</div>
          <SizeBox h={10}></SizeBox>
          <div className={styles.sub_title}>Sign up with us and start filter through hundreds of campaigns to discover the opportunities that suit your interests.</div>
        </div>

        <div>
          <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/02-icon.jpg"} />
          <div className={styles.title}>Create Content
            & Submit</div>
          <SizeBox h={10}></SizeBox>
          <div className={styles.sub_title}>Start crafting beautifully branded content with your creativity that you know your followers will be fond of. </div>
        </div>


        <div>
          <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/01-icon.jpg"} />
          <div className={styles.title}>Get Rewarded</div>
          <SizeBox h={10}></SizeBox>
          <div className={styles.sub_title}>You complete the campaign, we will credit you the payment. You’re in good hands!</div>
        </div>

      </div>

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
            {/* <div>Blog</div>*/}
            <SizeBox h={15}></SizeBox>
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


export default Home;
