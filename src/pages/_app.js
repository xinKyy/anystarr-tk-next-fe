import Head from 'next/head';
import { wrapper } from '../redux/store';
import Layout from '../components/Layout';
import '../../assets/global.css';
import 'antd/dist/reset.css';
import '../config/i18n';
import {ConfigProvider, message} from "antd";
import {InstagramOutlined, LinkedinOutlined} from "@ant-design/icons";
function App({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
          token: {
            colorLink: '#F0774A',
            colorLinkActive: '#F0774A',
            colorLinkHover: '#F0774A', // 控制超链接悬浮时的颜色。
            colorPrimary: '#F0774A', // 品牌色
            colorPrimaryActive: '#F0774A', // 主色梯度下的深色激活态。
            colorPrimaryBorder: '#F0774A', // 主色梯度下的描边用色，用在 Slider 等组件的描边上。
            colorPrimaryHover: '#F0774A', // 主色梯度下的悬浮态。
          }
      }}
    >
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <title>anystarr</title>
        <link rel='shortcut icon' href='/favicon.jpeg' type='image/ico'/>
      </Head>
      <Layout>
       <div>
         <div style={{
           minHeight:"calc(100vh - 110px)"
         }}>
           <Component {...pageProps} />
         </div>
         <div className={"app-footer"}>
           <div className={"footer-gray"}>
             <div className={"footer-g-content"}>
               <div className={"cont-left"}>
                 <a href={"https://www.abcomo.com/"} target={"_blank"}>
                   <img className={"logo-ab"} src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/logo_ab.png"}/>
                 </a>
                 <img className={"ic-sx"} src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/ic_sx.png"} />
                 <a href={"https://www.anystarr.com/"} target={"_blank"}>
                   <img className={"logo-1"} src={"https://anystarr-image.oss-ap-southeast-1.aliyuncs.com/logo_footer.png"} />
                 </a>
               </div>
               <a href={"https://www.anystarr.com/en/terms-and-conditions/"} className={"footer-link-2 link-item"}>
                 Terms and Conditions
               </a>
               <a href={"https://www.anystarr.com/en/privacy-policy/"} className={"footer-link-2 link-item"}>
                 Privacy Policy
               </a>
             </div>
           </div>
           <div className={"footer-black"}>
              <span>
                abComo ecommerce pte ltd.2024 All rights reserved
              </span>
           </div>
         </div>
       </div>
      </Layout>
    </ConfigProvider>
  );
}


export default wrapper.withRedux(App);
