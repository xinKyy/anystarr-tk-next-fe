import {message} from "antd";

export const splitWalletAddress = (address) =>{
  if (address) {
    address = address.substring(0, 6) + "***" + address.substring(address.length - 4, address.length);
    return address;
  }
  return "";
};

export const copyLink = (shareLink) => {
  var Url2 = shareLink;
  var oInput = document.createElement('input');
  oInput.value = Url2;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  document.execCommand('Copy');// 执行浏览器复制命令
  oInput.className = 'oInput';
  oInput.style.display = 'none';
  document.body.removeChild(oInput);
  message.success("复制成功");
};
