import Link from 'next/link';
import getConfig from 'next/config';
import {useRouter} from "next/router";
import host from "@/utils/host";
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
