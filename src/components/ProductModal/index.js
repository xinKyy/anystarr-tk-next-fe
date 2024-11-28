import React, { useState } from 'react';
import styles from './index.module.scss';
import { Modal } from 'antd';

const CustomModal = ({ visible, onCancel, title, customContent }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      borderRadius={20}
    >
      <div className={styles.customModal}>
        <p className={styles.title}>Method1</p>
        <div className={styles.steps}>
          <div className={styles.step}>     
            <div className={styles.left}>
              <img src='/static/detail-01.png'/>
              <div style={{marginTop: '10px'}}>
                <div>Add</div>
                <div>2</div>
              </div>
            </div>
            <div className={styles.right}>--<span className={styles.jt}>⇀</span></div>
          </div>

          <div className={styles.step}>     
            <div className={styles.left}>
              <img src='/static/detail-02.png'/>
              <div style={{marginTop: '10px'}}>
                <div>Add</div>
                <div>2</div>
              </div>
            </div>
            <div className={styles.right}>--<span className={styles.jt}>⇀</span></div>
          </div>

          <div className={styles.step}>     
            <div className={styles.left}>
              <img src='/static/detail-04.png'/>
              <div style={{marginTop: '10px'}}>
                <div>Add</div>
                <div>2</div>
              </div>
            </div>
            <div className={styles.right}>--<span className={styles.jt}>⇀</span></div>
          </div>

          <div className={styles.step}>     
            <div className={styles.left}>
              <img src='/static/detail-04.png'/>
              <div style={{marginTop: '10px'}}>
                <div>Add</div>
                <div>2</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div>
            <img src='/static/detail-01.png' style={{width: '200px', height: '200px'}}/>
          </div>
          <p>Use TikTok or mobile</p>
        </div>
        <p className={styles.title}>Method2</p>
        <div className={styles.footer}>
          <p>Copy the link below</p>
          <p>https://orx8nkdkdl.f
            <img src='/static/detail-05.png' style={{marginLeft: '20px'}}/>
          </p>
        </div>
      </div>
    </Modal>
  );
};

const ProductModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const customContent = (
    <div>
      <p>This is custom content in the modal.</p>
      <button onClick={closeModal}>Close Modal</button>
    </div>
  );

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <CustomModal
        visible={modalVisible}
        onCancel={closeModal}
        customContent={customContent}
      />
    </div>
  );
};

export default ProductModal;