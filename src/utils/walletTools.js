import Web3 from "web3";
import {message} from "antd";

export const loginMetaMask = async () => {
  const web3Service = () => new Web3(window.ethereum);
  const accounts = await web3Service().eth.getAccounts();
  return window.ethereum.request({ method: 'eth_requestAccounts' });
};

const getAddressHandle = async (web3) => {
  // 获取用户钱包地址
  try {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    localStorage.setItem("address", address);
  } catch (error) {
    localStorage.setItem("address", "");
  }
};
