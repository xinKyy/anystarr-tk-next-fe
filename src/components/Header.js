import Link from 'next/link';
import getConfig from 'next/config';
import { Button } from 'antd';
import { LoginOutlined, EditOutlined } from '@ant-design/icons';
import { color_white } from '../constants/CustomTheme';
import logo from "../imgs/header/mod-icon.webp";
// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.
const { publicRuntimeConfig: { staticFolder } } = getConfig();

const Header = () => (
  <div id='header_bar' className='container'>
    <Link href='/'>
      <div className='logo-container'>
        <img className='logo' alt='logo' src={logo.src} />
      </div>
    </Link>
    <div className='right-container'>
      <div className={"link_wallet"}>
        链接钱包
      </div>
      <div className='language-btn'></div>
      <div className='application-btn'></div>
    </div>
  </div>
);

export default Header;
