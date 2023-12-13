import Web3 from "web3";
import {message} from "antd";
import {
  connectToMetaMask,
  getAllIncome, getBtnNowStatus, getCumulativeGain, getmodbalance,
  getPersonalNum,
  getTeamLevel, getYesterdayIncome, ModBalance,
  updateAvailableWithdrawal
} from "@/utils/walletConact";

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


export const connectWallet = async (dispatchAction, joinTeam) =>{
  const address = await connectToMetaMask();
  console.log(dispatchAction, "dispatchAction");
  dispatchAction.setWalletInfo({
    address:address
  });
  localStorage.setItem("currentWallet", address);
  if (address){

    joinTeam?.call();

    const myBalance = await updateAvailableWithdrawal();
    dispatchAction.setWalletInfo({
      address:address,
      myBalance:myBalance,
    });

    const currentLevel = await getTeamLevel();
    dispatchAction.setWalletInfo({
      address:address,
      myBalance:myBalance,
      currentLevel:currentLevel
    });

    const sharePersonNum = await getPersonalNum();
    dispatchAction.setWalletInfo({
      address:address,
      myBalance:myBalance,
      currentLevel:currentLevel,
      sharePersonNum:sharePersonNum
    });

    const totalIncome = await getAllIncome();
    dispatchAction.setWalletInfo({
      address:address,
      myBalance:myBalance,
      currentLevel:currentLevel,
      sharePersonNum:sharePersonNum,
      totalIncome:totalIncome,
    });

    const myModBalance = await ModBalance();
    dispatchAction.setWalletInfo({
      address:address,
      myBalance:myBalance,
      currentLevel:currentLevel,
      sharePersonNum:sharePersonNum,
      totalIncome:totalIncome,
      myModBalance:myModBalance,
    });

    const yesterdayIncome = await getYesterdayIncome();
    dispatchAction.setWalletInfo({
      address:address,
      myBalance:myBalance,
      currentLevel:currentLevel,
      sharePersonNum:sharePersonNum,
      totalIncome:totalIncome,
      myModBalance:myModBalance,
      yesterdayIncome:yesterdayIncome
    });

    const cumulativeGain = await getCumulativeGain();
    dispatchAction.setWalletInfo({
      address:address,
      myBalance:myBalance,
      currentLevel:currentLevel,
      sharePersonNum:sharePersonNum,
      totalIncome:totalIncome,
      myModBalance:myModBalance,
      yesterdayIncome:yesterdayIncome,
      cumulativeGain:cumulativeGain
    });

    const modBalance = await getmodbalance();
    dispatchAction.setWalletInfo({
      address:address,
      myBalance:myBalance,
      currentLevel:currentLevel,
      sharePersonNum:sharePersonNum,
      totalIncome:totalIncome,
      myModBalance:myModBalance,
      yesterdayIncome:yesterdayIncome,
      cumulativeGain:cumulativeGain,
      modBalance:modBalance
    });

    const btnNowStatus = await getBtnNowStatus();
    dispatchAction.setWalletInfo({
      address:address,
      myBalance:myBalance,
      currentLevel:currentLevel,
      sharePersonNum:sharePersonNum,
      totalIncome:totalIncome,
      myModBalance:myModBalance,
      yesterdayIncome:yesterdayIncome,
      cumulativeGain:cumulativeGain,
      modBalance:modBalance,
      btnNowStatus:btnNowStatus === "0"
    });

  }

  // loginMetaMask().then(accounts=>{
  //   const selectedAccount = accounts[0];
  //   dispatchAction.setWalletInfo({
  //     address:selectedAccount
  //   });
  //   localStorage.setItem("currentWallet", selectedAccount);
  // }).catch(err=>{
  //   message.error("获取钱包失败");
  // });
};
