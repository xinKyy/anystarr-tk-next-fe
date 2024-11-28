
import {Empty, Button } from 'antd';
import styles from './index.module.scss';
const CustomEmpty = ({result}) => {
    return <>
        <div className={styles.Empty_container}>
            <div className={styles.container}>
                <div>
                    <img src='/static/no_data.png'></img>
                </div> 
                <div className={styles.msg}>
                Sorry，there are no results for “{result ? result : "未知"}”
                </div>
                <div className={styles.btn}>
                    Recommended for you
                </div>
            </div>
        </div>
    </>;
};
export default CustomEmpty;