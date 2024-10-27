import {message, Modal} from "antd";
import styles from "./index.module.scss";
import animationData from "./create_link_ani.json";
import successData from "./success_ani.json";
import failData from "./fail_ani.json";
import Lottie from "lottie-react";
import {APICreatLinkByPid, APIGetLinkByBatchId} from "@/api";
import {useEffect, useState, useRef} from "react";
import {isMobile} from "@/utils/action";
import copy from "copy-to-clipboard";
import { useRequest } from "ahooks";

const CreateLinkModal = ({show, onCancel, pidArr}) =>{
  const [success, setSuccess] = useState("none"); // "success" | "fail" | "none"
  const batchId = useRef();
  const link = useRef();

  const creatLink = () =>{
    APICreatLinkByPid(JSON.stringify(pidArr)).then(resp=>{
      if (resp.data.batchId){
        batchId.current = resp.data.batchId;
      } else {
        setSuccess("fail");
      }
    }).catch(e=>{
      setSuccess("fail");
    });
  };

  const getLinkByBatchId = async () =>{
    if (!batchId.current) return;
    if (!show) return;
    try {
      const resp = await APIGetLinkByBatchId(batchId.current);
      if (resp.data?.link){
        const status = resp.data.link.status;
        switch (status){
          case 2:{
            setSuccess("success");
            link.current = resp.data.link.link;
            break;
          }
          case 4:
          case 5:
          case 6:{
            setSuccess("fail");
            link.current = resp.data.link.link;
            break;
          }
          default:
            break;
        }
      }
    } catch (e){
      console.log(e, "e");
    }
  };

  useEffect(()=>{
    if (show){
      creatLink();
    }
  }, [show]);

  const { data, loading, error } = useRequest(getLinkByBatchId, {
    pollingInterval: 1000, // Poll every 5 seconds
    pollingWhenHidden: false, // Stop polling when the tab is inactive
    onError: (error) => {
      console.error("Polling failed:", error);
    },
  });

  const toAddTk = (e) =>{
    e.stopPropagation();
    if (link.current){
      if (isMobile()){
        window.open(link.current, "_blank");
      } else {
        copy(link.current);
        message.success("Copy link successfully, please open it with a browser on your mobile device");
      }
    }
  };

  return  <Modal title={"Create Link"} centered footer={null} width={330} visible={show} onCancel={(e)=>{
    e.stopPropagation();
    onCancel();
  }}>

    <div className={styles.create_link_page}>
      {
        success === "success" ? <Lottie animationData={successData}  loop={false} /> :
          success === "fail" ? <Lottie animationData={failData}  loop={false} /> : <Lottie animationData={animationData}  loop={true} />
      }
      {
        success === "success" ?
          <div onClick={toAddTk} className={styles.sampleBtn}>
            <div className={styles.btnInner}>Add to Showcase</div>
          </div> : success === "fail" ?
          <>
            <div>Sorry, the generation failed</div>
            <div className={styles.ok_btn} onClick={onCancel}>Ok</div>
          </> :  <div>We are generating a link for you, please be patient</div>
      }
    </div>

  </Modal>;

};

export default CreateLinkModal;
