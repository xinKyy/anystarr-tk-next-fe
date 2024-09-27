import Link from 'next/link';
import getConfig from 'next/config';
import {useRouter} from "next/router";
import host from "@/utils/host";
import {APIGetUserInfo} from "@/api";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import useDispatchAction from "@/hooks/useDisptachAction";
import {setUserInfo} from "@/redux/actions/home";
const { publicRuntimeConfig: { staticFolder } } = getConfig();
const Header = () => {
  const router = useRouter();
  const userInfo = useSelector(state => state.home.userInfo.userInfo);
  const dispatchAction = useDispatchAction({ setUserInfo });
  const getUserInfo = () =>{
    console.log(userInfo, "userInfo");
    const token = localStorage.getItem("token");
    if (token){
      APIGetUserInfo().then(resp=>{
        dispatchAction.setUserInfo();
      });
    }
  };


  useEffect(()=>{
    getUserInfo();
  }, []);


  return  <div id='header_bar' className='container'>

    <Link href='/'>
      <div className='logo-container'>
        <img className='logo' alt='logo' src={"https://app.anystarr.com/static/media/logo.6627c626.png"} />
      </div>
    </Link>

    <div className='right-container'>
      <div className='language-btn'></div>
      {
        <a href={`${host}/api/v1/tiktok/oauth`}>
          <div className={"link_wallet"}>
            Connect Tiktok
          </div>
        </a>
      }
    </div>
  </div>;
};

export default Header;
