import Link from 'next/link';
import getConfig from 'next/config';
import {Button, Drawer, message} from 'antd';
import { LoginOutlined, EditOutlined } from '@ant-design/icons';
import { color_white } from '../constants/CustomTheme';
import logo from "../imgs/header/mod-icon.webp";
import {connectWallet, loginMetaMask} from "../utils/walletTools";
import {useEffect, useState} from "react";
import {splitWalletAddress} from "@/utils/addressUtil";
import {useSelector} from "react-redux";
import useDispatchAction from "@/hooks/useDisptachAction";
import {setWalletInfo} from "@/redux/actions/home";
import {useRouter} from "next/router";
import {t} from "i18next";
import {
  addOrgan,
  connectToMetaMask,
  getHasJoinedOrgan, getmodbalance,
  getTeamLevel,
  updateAvailableWithdrawal
} from "@/utils/walletConact";
import {useTranslation} from "react-i18next";
// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.
const { publicRuntimeConfig: { staticFolder } } = getConfig();

const Header = () => {
  const router = useRouter();
  const walletInfo = useSelector(state => state.home.walletInfo.walletInfo);
  const dispatchAction = useDispatchAction({ setWalletInfo });
  const [open, setOpen] = useState(false);
  const [showLanguageWrap, setShowLanguageWrap] = useState(false);
  const { t, i18n} = useTranslation();
  useEffect(async ()=>{
    const modBalance = await getmodbalance();
    dispatchAction.setWalletInfo({
      modBalance:modBalance
    });
    let walletAddress = localStorage.getItem("currentWallet");
    if (walletAddress && walletAddress !== "undefined"){
      dispatchAction.setWalletInfo({
        address:walletAddress
      });
      await connectWallet(dispatchAction, joinTeam);
    }
  }, []);


  const joinTeam = () =>{
    const path = router.asPath;
    if (path && path.startsWith("/?")){
      let shareAddress = path.split("?")[1];
      getHasJoinedOrgan(shareAddress).then(resp=>{
        if (resp === false){
          addOrgan(shareAddress).then(resp =>{
            message[resp.result ? "success" : "error"](resp.msg);
          });
        }
      });
    }
  };

  const logout = () =>{
    localStorage.removeItem("currentWallet");
    dispatchAction.setWalletInfo({});
    setOpen(false);
  };

  const changeLanguage = (key) =>{
    i18n.changeLanguage(key).then(r => {
      router.replace(`/`, `/`, );
    }).finally(() =>{
      setShowLanguageWrap(false);
    });
  };

  return  <div id='header_bar' className='container'>

    {
      router.pathname === "/" ?    <Link href='/'>
        <div className='logo-container'>
          <img className='logo' alt='logo' src={logo.src} />
        </div>
      </Link> : <div onClick={()=>router.push("/")} className={"back-icon"}></div>
    }

    {
      router.pathname === "/" ? <div className='right-container'>
        {
          walletInfo.address ?
            <div className={"address_show_wrap"}>
              { splitWalletAddress( walletInfo.address) }
            </div> :
            <div onClick={()=>connectWallet(dispatchAction)} className={"link_wallet"}>
              {t("t27")}
            </div>
        }
        <div onClick={()=>setShowLanguageWrap(true)} className='language-btn'></div>
        {
          walletInfo.address ?  <div onClick={()=>setOpen(true)} className='application-btn'></div> : null
        }
      </div> : <div className={"sub_page_title"}> {t("t19")}</div>
    }

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
        <div onClick={logout}>{t("t28")}</div>
      </div>
    </Drawer>

    <Drawer
      placement={"bottom"}
      onClose={()=>setShowLanguageWrap(false)}
      visible={showLanguageWrap}
    >
      <div className={"select-language-wrap"}>
        <div onClick={()=>changeLanguage("en")}>English</div>
        <div onClick={()=>changeLanguage("jp")}>日本語</div>
        <div onClick={()=>changeLanguage("kr")}>한국어</div>
        <div onClick={()=>changeLanguage("cn")}>简体中文</div>
      </div>
    </Drawer>
  </div>;
};

export default Header;
