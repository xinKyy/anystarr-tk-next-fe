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
  return  <div id='header_bar' className='container'>

    <Link href='/'>
      <div className='logo-container'>
        <img className='logo' alt='logo' src={"https://app.anystarr.com/static/media/logo.6627c626.png"} />
      </div>
    </Link>

    <div className='right-container'>
      <div className='language-btn'></div>
      {
        <div className={"link_wallet"}>
          Connect Tiktok
        </div>
      }
    </div>
  </div>;
};

export default Header;
