import Link from 'next/link';
import getConfig from 'next/config';
import {useRouter} from "next/router";
import host from "@/utils/host";
import {APIGetUserInfo} from "@/api";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import useDispatchAction from "@/hooks/useDisptachAction";
import {setUserInfo} from "@/redux/actions/home";
import {Avatar, Input, Modal, Popover, Select} from "antd";
import {getQueryString, isMobile} from "@/utils/action";
import LoginModal from "@/components/LoginModal";
const { Option } = Select;
const { publicRuntimeConfig: { staticFolder } } = getConfig();
const Header = () => {
  const router = useRouter();
  const userInfo = useSelector(state => state.home.userInfo.userInfo);

  const [mobile, setMobile] = useState();
  const [openConnectModal, setOpenConnectModal] = useState(false);

  const dispatchAction = useDispatchAction({ setUserInfo });
  const getUserInfo = () =>{
    const token = localStorage.getItem("token");
    if (token){
      APIGetUserInfo().then(resp=>{
        if (resp.data.user){
          const user = resp.data.user;
          dispatchAction.setUserInfo(user);
          localStorage.setItem("user", JSON.stringify(user));
        }
      });
    }
  };


  useEffect(()=>{

    setMobile(isMobile());

    const tokenStr = getQueryString("token");
    if (tokenStr){
      localStorage.setItem("token", tokenStr);
      router.push("/");
    }
    getUserInfo();
    // const user = {
    //   "id": 6003,
    //   "openId": "-000V3sGqSuFQyRHskcsGNbJs3I9M8825kTp",
    //   "unionId": "71daec53-1fd1-5321-8faf-e87b81b3ee12",
    //   "token": "act.TI88LaXHX8cTNGo1K9loWARpZ5O7vwpMWBbat3VJfkvN3z7SMwRa96xSoAGt!6176.va",
    //   "updateTime": "2024-09-28T05:45:37.000+00:00",
    //   "avatarUrl": "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1594805258216454~c5_168x168.jpeg?lk3s=a5d48078&nonce=58290&refresh_token=f278f199bfe5127018cf978496152287&x-expires=1727672400&x-signature=0J%2FrIX0BBeOxUSTDYhUq%2Fqc56y0%3D&shp=a5d48078&shcp=8aecc5ac",
    //   "displayName": "xink0722cc",
    //   "profileDeepLink": "https://vm.tiktok.com/ZMh636hH9/",
    //   "bioDescription": null,
    //   "followerCount": 0,
    //   "followingCount": 0,
    //   "likesCount": 0,
    //   "videoCount": 0,
    //   "isDelete": 0
    // };
    // dispatchAction.setUserInfo(user);
    // localStorage.setItem("userInfo", JSON.stringify(user));
  }, []);



  const content = (
    <div className={"pop_content"}>
      <Link href={"/myLike"}><div>My Collection</div></Link>
      <Link href={"/person-center"}><div>Person center</div></Link>
      <div onClick={()=>{
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        dispatchAction.setUserInfo(null);
        router.push("/");
      }}>Logout</div>
    </div>
  );


  return  <div id='header_bar' className='header_container'>

    <Link href='/'>
      <div className='logo-container'>
        <img className='logo' alt='logo' src={"https://app.anystarr.com/static/media/logo.6627c626.png"} />
      </div>
    </Link>

    <LoginModal open={openConnectModal} onCancel={()=>setOpenConnectModal(false)}></LoginModal>

    <div className='right-container'>
      {/* <div className='language-btn'></div>*/}
      <SearchInput/>
      {
        userInfo?.displayName || userInfo?.avatarUrl ?
          <Popover trigger={"click"} placement={"bottom"} content={content}>
            <div style={{cursor:"pointer"}}>
             <Avatar src={userInfo?.avatarUrl}></Avatar>
              <span className={"user_name_wrap"} style={{marginLeft:"10px"}}>{userInfo?.displayName}</span>
            </div>
          </Popover>
          :  <div onClick={()=>setOpenConnectModal(true)} className={"link_wallet"}>
            Login
          </div>
      }
    </div>
  </div>;
};


const SearchInput = () =>{
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [currenSearchType, setCurrentSearchType] = useState(1); // 1 pid 2 name 3 佣金率
  const currenSearchTypeRef = useRef(1); // 1 pid 2 name 3 佣金率
  const handleChange = (value) => {
    currenSearchTypeRef.current = value;
    setCurrentSearchType(value);
  };
  const router = useRouter();

  const onSearch = () =>{
    router.push(`/?s=${searchName}&t=${currenSearchType}`);
    setSearchName("");
    setOpen(false);
  };

  useEffect(()=>{
    setMobile(isMobile());
  }, []);

  if (mobile) return <div></div>;

  return  <div>
    <img onClick={()=>setOpen(!open)}  className={"search_icon"} src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-next-asset/search.png"} />
    <Modal rootClassName={"global_search"} width={ mobile ? null : 631}  centered={!mobile}   footer={null} title={null} closable={false} open={open} onCancel={()=>setOpen(false)}>
      <div className={"search_warp"}>
        <div className={"left_wrap"}>
          <Select rootClassName={"left_wrap"} onChange={handleChange} defaultValue={currenSearchType}>
            <Option value={1}>Product Link</Option>
            <Option value={2}>Product Name</Option>
          </Select>
        </div>
        <Input value={searchName} onChange={(e)=>setSearchName(e.target.value)} onPressEnter={onSearch} placeholder={`Search Product ${currenSearchType === 1 ? "Link" : "Name"}`} className={"input"}></Input>
        <div onClick={onSearch} className={"right_wrap"}>
          <img src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/anystarr-next-asset/search_white.png"}/>
        </div>
      </div>
    </Modal>
  </div>;
};

export default Header;
