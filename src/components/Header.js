import Link from 'next/link';
import getConfig from 'next/config';
import {Button, Drawer, message, Modal} from 'antd';
import { LoginOutlined, EditOutlined } from '@ant-design/icons';
import { color_white } from '../constants/CustomTheme';
import logo from "../imgs/header/mod-icon.webp";
import {connectWallet, loginMetaMask} from "../utils/walletTools";
import {useEffect, useState} from "react";
import {getQueryString, splitWalletAddress} from "@/utils/addressUtil";
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
  const [hideModal, setHideModal] = useState(false);
  const [shareHrefAddress, setShareHrefAddress] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const {i18n} = useTranslation();
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
    let address = getQueryString("address");
    if (address){
      setShareHrefAddress(address);
      getHasJoinedOrgan(address).then(resp=>{
        if (resp === false){
          setHideModal(true);
        }
      });
    } else if (path && path.startsWith("/?")){

        let currentPath = path;
        if (currentPath.indexOf("?utm_source=tokenpocket")){
          currentPath = currentPath.replace("?utm_source=tokenpocket", "");
        }

        if (currentPath && currentPath.length < 30){
          return;
        }

        let shareAddress = currentPath.split("?")[1];
        if (shareAddress.indexOf("&utm_source=tokenpocket")){
          shareAddress = shareAddress.replace("&utm_source=tokenpocket", "");
        }
        setShareHrefAddress(shareAddress);
        getHasJoinedOrgan(shareAddress).then(resp=>{
          if (resp === false){
            setHideModal(true);
          }
        });
      }

  };

  const realJoinTeam = () =>{
    setConfirmLoading(true);
    addOrgan(shareHrefAddress).then(resp =>{
      message[resp.result ? "success" : "error"](resp.msg);
    }).finally(()=>{
      setHideModal(false);
      setConfirmLoading(false);
    });
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

  const routerTitleMap = {
    "/promotion":t("t65"),
    "/income":t("t19"),
    "/mod-management":"管理员"
  };

  return  <div id='header_bar' className='container'>

    {
      router.pathname === "/" ?    <Link href='/'>
        <div className='logo-container'>
          <img className='logo' alt='logo' src={logo.src} />
        </div>
      </Link> : <div onClick={()=>router.replace("/")} className={"back-icon"}></div>
    }

    {
      router.pathname === "/" ? <div className='right-container'>
        {
          walletInfo.address ?
            <div className={"address_show_wrap"}>
              { splitWalletAddress( walletInfo.address) }
            </div> :
            <div onClick={()=>{
              connectWallet(dispatchAction);
            }} className={"link_wallet"}>
              {t("t27")}
            </div>
        }
        <div onClick={()=>setShowLanguageWrap(true)} className='language-btn'></div>
        {
          walletInfo.address ?  <div onClick={()=>setOpen(true)} className='application-btn'></div> : null
        }
      </div> : <div className={"sub_page_title"}>{ routerTitleMap[router.pathname] }</div>
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
        <div className={"store_icon"}></div>
        <div onClick={()=>message.info(t("t58"))}>{t("t59")}</div>
      </div>
      <div className={"flex_div_wrap"}>
        <div className={"short_icon"}></div>
        <div onClick={()=>message.info(t("t61"))}>{t("t62")}</div>
      </div>
      <div className={"flex_div_wrap"}>
        <div className={"short_video_icon"}></div>
        <div onClick={()=>message.info(t("t61"))}>{t("t63")}</div>
      </div>
      <div className={"flex_div_wrap"}>
        <div className={"chat_icon"}></div>
        <div onClick={()=>message.info(t("t61"))}>{t("t64")}</div>
      </div>
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

    <Modal
      title={t("t47")}
      visible={hideModal}
      onOk={()=>realJoinTeam()}
      onCancel={()=>setHideModal(false)}
      okText={t("t48")}
      confirmLoading={confirmLoading}
      cancelText={t("t49")}
    >
      <p>{t("t50")} {splitWalletAddress(shareHrefAddress)} {t("t51")}</p>
    </Modal>
  </div>;
};

export default Header;
