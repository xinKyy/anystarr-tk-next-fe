
import {Empty, Button } from 'antd';
import styles from './index.module.scss';
import {useRouter} from "next/router";
const CustomEmpty = ({result}) => {
  const router = useRouter();
  const refresh = () =>{
    router.reload();
  };

    return (
        <div className={styles.Empty_container}>
            <div className={styles.container}>
                <div>
                    <img src='/static/no_data.png'></img>
                </div>
                <div className={styles.msg}>
                Sorry，there are no results for “{result ? result : "unknown"}”
                </div>
                <div onClick={refresh} className={styles.btn}>
                    Recommended for you
                </div>
            </div>
        </div>
    );
};
export default CustomEmpty;
