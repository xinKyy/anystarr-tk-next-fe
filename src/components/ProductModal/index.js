import React, { useState } from 'react';
import styles from './index.module.scss';
import QRCode from "react-qr-code";
import {message, Modal} from 'antd';
import copy from "copy-to-clipboard";

const AddShowCaseStepModal = ({ visible, link,  onCancel}) => {

  const onCopy = () =>{

    copy(link);
    message.success("Copy link successfully, please open it with a browser on your mobile device");

  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={915}
      borderRadius={30}
    >
      <div className={styles.customModal}>
        <p className={styles.title}>Method1</p>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.left}>
              <img src='/static/detail-01.png'/>
              <div>
                <div>Add</div>
                <div>to showcase</div>
              </div>
            </div>
            <div className={styles.to_right} />
          </div>

          <div className={styles.step}>
            <div className={styles.left}>
              <img src='/static/detail-02.png'/>
              <div style={{marginTop: '10px'}}>
                <div>Get</div>
                <div>Free Sample</div>
              </div>
            </div>
            <div className={styles.to_right} />
          </div>

          <div className={styles.step}>
            <div className={styles.left}>
              <img src='/static/detail-04.png'/>
              <div style={{marginTop: '10px'}}>
                <div>Post</div>
                <div>Shoppable Video</div>
              </div>
            </div>
            <div className={styles.to_right} />
          </div>

          <div className={styles.step}>
            <div className={styles.left}>
              <img src='/static/detail-04.png'/>
              <div style={{marginTop: '10px'}}>
                <div>Earn</div>
                <div>Commission</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.qr_wrap}>
            <QRCode
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={link}></QRCode>
          </div>
          <p></p>
          <p>Use TikTok or mobile apps to scan the QR code to get free sample.</p>
        </div>
        <p className={styles.title}>Method2</p>
        <div className={styles.footer}>
          <p>Copy the link below to open it in your mobile browser:</p>
          <p>{link}
            <img onClick={onCopy} src='/static/detail-05.png' style={{marginLeft: '20px'}}/>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AddShowCaseStepModal;
