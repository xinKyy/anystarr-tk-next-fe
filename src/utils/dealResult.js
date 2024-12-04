import {
    message
} from 'antd';


// 可以使用监听函数监听此对象弹出登录框
export const loginShowModal = {
  showModal: false
};

// 统一处理服务端的返回结果
export const dealResult = async (resp, props) => {
    if (resp.code === "500" || resp.msg === "Authentication failed") {
       message.error("Login expired!");
       localStorage.removeItem("user");
       localStorage.removeItem("token");
       setTimeout(() => {
          window.location.href = "/";
       }, 1000);
       return "unLogin";
    }
    if (resp){
      return true;
    }
    return false;
};
