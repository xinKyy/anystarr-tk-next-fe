import styles from "./index.module.scss";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {isMobile} from "@/utils/action";

const BackBtn = () =>{
  const [mobile, setMobile] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    setMobile(isMobile());
  }, []);

  return <div onClick={() => router.push("/")} className={styles.back_btn}>
    <div/>
    {
      !mobile && "Back"
    }
  </div>;
};

export default BackBtn;
