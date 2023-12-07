// 创建一个 web3 实例
import Web3 from "web3";
import BigNumber from "bignumber.js";
import {message} from "antd";
import {t} from "i18next";
import {numSubString} from "@/utils/numUtils";

const web3 = new Web3(window.ethereum);
const ethereum = window.ethereum;

// 引入代币合约的 ABI
const tokenContractAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_modToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_usdtToken",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "TokenMod",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TokenUsdt",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_orgin",
        "type": "address"
      }
    ],
    "name": "addOrgin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amountMod",
        "type": "uint256"
      }
    ],
    "name": "buyMod",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "buyamountUsdt",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "countTeamIncome",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "dailyIncomeMap",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "yesterdayIncome",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllIncome",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCumulativeGain",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "getMod",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPersonalNum",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRevenueDetailsMap",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "details",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          }
        ],
        "internalType": "struct PrivateEquity.RevenueDetails[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTeamIncome",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalIncome",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTeamLevel",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getWithdrawalLogs",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timeString",
            "type": "uint256"
          }
        ],
        "internalType": "struct PrivateEquity.WithdrawalLog[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getYesterdayIncome",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getmodbalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_modbalance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "hasJoinedOrgan",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "income",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "modBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "organMap",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "parent",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "priceone",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pricethree",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pricetwo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "revenueDetailsMap",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "details",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "revenueMap",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalWithdrawn",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "setModPriceone",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "setModPricethree",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "setModPricetwo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "updateAvailableWithdrawal",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


const ERC20Abi = [
  {
    "name": "approve",
    "type": "function",
    "inputs": [
      {
        "name": "_spender",
        "type": "address",
        "indexed": false
      },
      {
        "name": "_value",
        "type": "uint256",
        "indexed": false
      }
    ],
    "outputs": [
      {
        "name": "success",
        "type": "bool",
        "indexed": false
      }
    ]
  }
];

const BN1 = web3.utils.toWei("1", 'ether');

// 初始化账户地址
let accountAddress = 'YOUR_INITIAL_ACCOUNT_ADDRESS';

// 代币合约地址
const tokenContractAddress = '0xc358492B3f7CBE506ED882291Ca4D8c4eE09E94d';
const Erc20ContractAddress = "0xD43607C8F3622b8c39536C54adbfFcF01BBf807c";

// 获取代币合约实例
const tokenContract = new web3.eth.Contract(tokenContractAbi, tokenContractAddress);

const amountUsdt = new web3.eth.Contract(ERC20Abi, Erc20ContractAddress);

// 连接metamask
export async function connectToMetaMask() {
  if (window.ethereum) {
    try {
      // 请求用户授权连接 MetaMask
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      // 连接成功后，accounts 数组中将包含用户的账户地址
      accountAddress = accounts[0];
      return accountAddress;
    } catch (error) {
      // console.error('连接到 MetaMask 时出错:', error.message);
      // alert('连接到 MetaMask 时出错: ' + error.message);
      message.error("连接钱包失败:" + error.message);
      return false;
    }
  } else {
    // MetaMask 未安装
    // console.error('MetaMask 未安装。请安装 MetaMask 以使用此功能。');
    // alert('MetaMask 未安装。请安装 MetaMask 以使用此功能。');
    message.error("请安装MateMask");
    return false;
  }
}

// 监听账户切换
ethereum.on('accountsChanged', (accounts) => {
  // accounts 数组包含当前连接的所有账户
  // console.log('MetaMask 账户已切换。新账户:', accounts[0]);
  // alert('MetaMask 账户已切换。新账户: ' + accounts[0]);
  // updateAccountAddress(accounts[0]);
});


// 更新账户地址的函数
async function updateAccountAddress(newAddress) {
  accountAddress = newAddress;
  console.log('账户地址已更新:', accountAddress);
}


// //代币总供应量为
// async function getModtotalSupply() {
//     try {
//         const balance = await tokenContract.methods.getModtotalSupply().call();
//         console.log('Mod 代币总供应量为:', balance);
//         return balance;
//     } catch (error) {
//         console.error('查询 Mod 代币总供应量时出错:', error.message);
//     }
// }

async function approve(amount) {
  try {
    const transaction = await amountUsdt.methods.approve(tokenContractAddress, amount).send({
      from: accountAddress,
      gas: '1500000',
      gasPrice: '30000000',
    });
    console.log('授权:', transaction);
  } catch (error) {
    console.error('授权:', error.message);
  }
}

// 购买代币
export async function buyMod(amountUsdt) {
  let aa = web3.utils.toWei(amountUsdt + "", 'ether');
  const distanceOfTheSun = aa;
  await approve(aa.valueOf());
  try {
    const transaction = await tokenContract.methods.buyMod(distanceOfTheSun.valueOf()).send({
      from: accountAddress,
      gas: '1500000',
      gasPrice: '30000000',
    });
    return {
      result:true,
      msg:t("t40")
    };
  } catch (error) {
    return {
      result:false,
      msg:t("t41")
    };
  }
}

// 领取mod代币
export async function getMod(amount) {
  let amountBN = web3.utils.toWei(amount + "", 'ether');
  try {
    const transaction = await tokenContract.methods.getMod(amountBN).send({
      from: accountAddress,
      gas: '1500000',
      gasPrice: '30000000',
    });
    return {
      result:true,
      msg:t("t42")
    };
  } catch (error) {
    console.log(error.message);
    return {
      result:false,
      msg:t("t43")
    };
  }
}

// 加入团队
export async function addOrgan(origin) {
  try {
    const transaction = await tokenContract.methods.addOrgin(origin).send({
      from: accountAddress,
      gas: '1500000',
      gasPrice: '30000000',
    });
    return {
      result: true,
      msg:t("t44")
    };
  } catch (error) {
    console.error('加入团队出错:', error.message);
    return {
      result: false,
      msg:t("t45")
    };
  }
}

// 获取直推的总充值量
async function getIncome() {
  try {
    const amount = await tokenContract.methods.income().call({
      from: accountAddress
    });
    console.log('直推总充值量为:', amount);
    return amount;
  } catch (error) {
    console.error('查询直推总充值量时出错:', error.message);
  }
}

// 获取团队的总充值量
async function getTeamIncome() {
  try {
    const totalIncome = await tokenContract.methods.getTeamIncome().call({
      from: accountAddress
    });
    console.log('团队总充值量为:', totalIncome);
    return totalIncome;
  } catch (error) {
    console.error('查询团队总充值量时出错:', error.message);
  }
}

// 获取交易记录
export async function getWithdrawalLogs() {
  try {
    const logs = await tokenContract.methods.getWithdrawalLogs().call({
      from: accountAddress
    });
    console.log('提现记录为:', logs);
    return logs;
  } catch (error) {
    console.error('查询提现记录时出错:', error.message);
    return [];
  }
}


// 查询可领取收入
export async function updateAvailableWithdrawal() {
  try {
    const transaction = await tokenContract.methods.updateAvailableWithdrawal().call({
      from: accountAddress,
    });
    console.log('查询可领取收入余额成功:', transaction);
    return numSubString(transaction / BN1);
  } catch (error) {
    console.error('查询可领取收入余额出错:', error.message);
    return 0;
  }
}


// 提取收益
async function withdraw() {
  try {
    const transaction = await tokenContract.methods.withdraw().send({
      from: accountAddress,
      gas: '1500000',
      gasPrice: '30000000',
    });
    console.log('提取收益成功:', transaction);
  } catch (error) {
    console.error('提取收益出错:', error.message);
  }
}

// 获取分享人数
export async function getPersonalNum() {
  try {
    const num = await tokenContract.methods.getPersonalNum().call({
      from: accountAddress
    });
    console.log('个人分享人数为:', num);
    return num;
  } catch (error) {
    console.error('查询个人分享人数时出错:', error.message);
    return 0;
  }
}

// 查询领取mod代币
export async function ModBalance() {
  try {
    const num = await tokenContract.methods.modBalance(accountAddress).call({
      from: accountAddress
    });
    console.log('领取mod代币:', num);
    return numSubString(num / BN1);
  } catch (error) {
    console.error('查询领取mod代币时出错:', error.message);
    return 0;
  }
}


// 获取收益明细
export async function getRevenueDetailsMap() {
  try {
    const num = await tokenContract.methods.getRevenueDetailsMap().call({
      from: accountAddress
    });
    console.log('获取收益明细:', num);
    return num;
  } catch (error) {
    console.error('查询获取收益明细时出错:', error.message);
    return [];
  }
}

// 获取当前等级
export async function getTeamLevel() {
  try {
    const num = await tokenContract.methods.getTeamLevel().call({
      from: accountAddress
    });
    console.log('获取当前等级:', num);
    return num;
  } catch (error) {
    console.error('查询获取当前等级时出错:', error.message);
    return 0;
  }
}


// 获取所有收益
export async function getAllIncome() {
  try {
    const num = await tokenContract.methods.getAllIncome().call({
      from: accountAddress
    });
    console.log('获取所有收益:', num);
    return numSubString(num / BN1);
  } catch (error) {
    console.error('查询获取所有收益时出错:', error.message);
    return 0;
  }
}


// 获取昨天收益 getYesterdayIncome
export async function getYesterdayIncome() {
  try {
    const num = await tokenContract.methods.getYesterdayIncome().call({
      from: accountAddress
    });
    console.log('获取所有收益:', num);
    return numSubString(num / BN1);
  } catch (error) {
    console.error('查询获取所有收益时出错:', error.message);
    return 0;
  }
}

// 累计收益
export async function getCumulativeGain() {
  try {
    const num = await tokenContract.methods.getCumulativeGain().call({
      from: accountAddress
    });
    console.log('获取累计收益:', num);
    return numSubString(num / BN1);
  } catch (error) {
    console.error('查询累计收益时出错:', error.message);
    return 0;
  }
}

// 是否加入团队
export async function getHasJoinedOrgan(shareAddress) {
  try {
    if (shareAddress === accountAddress){
      return true;
    }
    const flag = await tokenContract.methods.hasJoinedOrgan(accountAddress).call({
      from:accountAddress
    });
    console.log('是否加入团队:', flag);
    return flag;
  } catch (error) {
    console.error('是否加入团队时出错:', error.message);
    return true;
  }
}


 // 获取代币剩余
 export async function getmodbalance() {
  try {
    const num = await tokenContract.methods.getmodbalance().call();
    console.log('获取代币剩余:', num);
    return numSubString(num / BN1);
  } catch (error) {
    console.error('获取代币剩余时出错:', error.message);
    return 0;
  }
}

