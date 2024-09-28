import styles from "./index.module.scss";
import {useRouter} from "next/router";

const BackBtn = () =>{

  const router = useRouter();
  return <div onClick={() => router.back()} className={styles.back_btn}>
    <div/>
    Back
  </div>;
};

export default BackBtn;
