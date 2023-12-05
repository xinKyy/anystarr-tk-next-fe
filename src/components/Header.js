import Link from 'next/link';
import getConfig from 'next/config';
import {Button, Drawer, message} from 'antd';
import { LoginOutlined, EditOutlined } from '@ant-design/icons';
import { color_white } from '../constants/CustomTheme';
import logo from "../imgs/header/mod-icon.webp";
import { loginMetaMask } from "../utils/walletTools";
import {useEffect, useState} from "react";
import {splitWalletAddress} from "@/utils/addressUtil";
import {useSelector} from "react-redux";
import useDispatchAction from "@/hooks/useDisptachAction";
import {setWalletInfo} from "@/redux/actions/home";
// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.
const { publicRuntimeConfig: { staticFolder } } = getConfig();

const Header = () => {

  const walletInfo = useSelector(state => state.home.walletInfo.walletInfo);
  const dispatchAction = useDispatchAction({ setWalletInfo });
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    let walletAddress = localStorage.getItem("currentWallet");
    if (walletAddress && walletAddress !== "undefined"){
      dispatchAction.setWalletInfo({
        address:walletAddress
      });
    }
  }, []);

  const connectWallet = () =>{
    if (walletInfo.address !== undefined){
      return;
    }
    loginMetaMask().then(accounts=>{
      const selectedAccount = accounts[0];
      dispatchAction.setWalletInfo({
        address:selectedAccount
      });
      localStorage.setItem("currentWallet", selectedAccount);
    }).catch(err=>{
      message.error("获取钱包失败");
    });
  };


  const logout = () =>{
    localStorage.removeItem("currentWallet");
    dispatchAction.setWalletInfo({});
    setOpen(false);
  };

  return  <div id='header_bar' className='container'>
    <Link href='/'>
      <div className='logo-container'>
        <img className='logo' alt='logo' src={logo.src} />
      </div>
    </Link>
    <div className='right-container'>
      {
       walletInfo.address ?
         <div className={"address_show_wrap"}>
             { splitWalletAddress( walletInfo.address) }
        </div> :
         <div onClick={connectWallet} className={"link_wallet"}>
             链接钱包
         </div>
      }
      <div className='language-btn'></div>
      {
        walletInfo.address ?  <div onClick={()=>setOpen(true)} className='application-btn'></div> : null
      }
    </div>

    <Drawer
      placement={"left"}
      closable={false}
      onClose={()=>setOpen(false)}
      visible={open}
      key={"left"}
    >
      <div className={"header-drawer-top-logo"}></div>
      <div className={"flex_div_wrap"}>
        <div className={"logout_icon"}></div>
        <div onClick={logout}>退出</div>
      </div>
    </Drawer>
  </div>;
};

export default Header;
