import {
    message
} from 'antd';


// 可以使用监听函数监听此对象弹出登录框
export const loginShowModal = {
  showModal: false
};

// 统一处理服务端的返回结果
export const dealResult = async (resp, props) => {
    if (resp) {
        return true;
    }
    return false;
};
