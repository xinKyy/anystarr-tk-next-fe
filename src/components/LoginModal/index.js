import styles from "./index.module.scss";
import SizeBox from "@/components/SizeBox";
import host from "@/utils/host";
import {Modal} from "antd";

const LoginModal = ({open, onCancel})=>{

  return <Modal title={"Connect Tiktok"} centered footer={null} open={open} onCancel={(e)=>{
    e.stopPropagation();
    onCancel();
  }}>
    <div className={styles.login_modal}>

      <div>
        <div className={styles.login_title}>Login</div>
        <div className={styles.title_desc}>Continue to anystarr</div>
      </div>
      <SizeBox h={30}></SizeBox>
      <a href={`${host}/api/v1/tiktok/oauth`}>
        <div className={"link_wallet"}>
          Connect Tiktok
        </div>
      </a>

      <div className={styles.help_wrap}>
        <a href={`/beta/helpCenter`} target={"_blank"}><div>Help</div></a>
        <a href={`https://www.anystarr.com/en/privacy-policy/`} target={"_blank"}><div>Privacy Policy</div></a>
        <a href={`https://www.anystarr.com/en/terms-and-conditions/`} target={"_blank"}><div>Terms and Conditions</div></a>
      </div>
    </div>
  </Modal>;
};

export default LoginModal;
