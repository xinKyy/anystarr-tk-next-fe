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
        <div className={styles.title_desc}>Continue to anyStarr</div>
      </div>
      <SizeBox h={30}></SizeBox>
      <a href={`${host}/api/v1/tiktok/oauth`}>
        <div className={"link_wallet"}>
          Connect Tiktok
        </div>
      </a>
      <div style={{
        marginTop:"10px"
      }} className={styles.help_wrap}>
        By proceeding, you agree to the
        <a style={{margin:"0 5px"}} href={"/Terms_and_Conditions_anyStarr.html"} target={"_blank"}>Terms and Conditions {" "} </a> and
        <a style={{margin:"0 5px"}} href={"/privacy_policy.html"} target={"_blank"}> {" "} Privacy Policy </a>
      </div>
    </div>
  </Modal>;
};

export default LoginModal;
