import styles from "./index.module.scss";
import {Avatar} from "antd";
import SizeBox from "@/components/SizeBox";

const PersonCenter = () =>{
  return <div className={styles.person_center}>
    <div className={styles.bg_wrap}></div>
    <div className={styles.avatar_wrap}>
      <Avatar className={styles.avatar} size={100} src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/home_bg-scaled-2.jpg"}></Avatar>
    </div>
    <div className={styles.nick_name}>
      XXXX
    </div>
    <div className={styles.info_wrap}>
      <div className={styles.info_item}>
        <div className={styles.num}>5579</div>
        <div className={styles.des}>粉丝数</div>
      </div>
      <SizeBox w={20}></SizeBox>
      <div className={styles.info_item}>
        <div className={styles.num}>79998</div>
        <div className={styles.des}>视频点赞数</div>
      </div>
    </div>
  </div>;
};

export default PersonCenter;
