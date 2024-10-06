import {Button, Modal} from "antd";
import SizeBox from "@/components/SizeBox";
import host from "@/utils/host";


const ConnectTikTipsModal = ({show, onCancel}) =>{
  return (
    <Modal title={"Tips"} centered footer={null} width={330} visible={show} onCancel={(e)=>{
      e.stopPropagation();
      onCancel();
    }}>
      <div style={{padding:"0px"}}>
        <div style={{textAlign:"center"}}>You haven't logged in yet, enjoy more features after logging in!</div>
        <SizeBox h={15}></SizeBox>
        <a href={`${host}/api/v1/tiktok/oauth`}>
          <div className={"link_wallet"}>
            Connect Tiktok
          </div>
        </a>
      </div>
    </Modal>
    );
};

export default ConnectTikTipsModal;
