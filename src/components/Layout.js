import PropTypes from 'prop-types';
import DynamicAntdTheme from 'dynamic-antd-theme';
import Header from './Header';
import {BackTop} from "antd";
import ConnectTikTipsModal from "@/components/connectTikTipsModal";
import LoginModal from "@/components/LoginModal";
import {useRouter} from "next/router";

const hideHeader = ["/influencers-2", "/home"];

function Layout({ children }) {

  const router = useRouter();

  return (
    <>
      <style jsx>{`
        .content-container {
          padding-top: 60px;
        }
      `}</style>

      {
        !hideHeader.includes(router.pathname)  &&  <Header />
      }
      <div className='content-container'>
        {children}
      </div>
      {
        !hideHeader.includes(router.pathname) && <div className={"app-footer"}>
          <div className={"footer-gray"}>
            <div className={"footer-g-content"}>
              <a href={"/beta/Terms_and_Conditions_anyStarr.html"} className={"footer-link-2 link-item"}>
                Terms and Conditions
              </a>
              <a href={"/beta/privacy_policy.html"} className={"footer-link-2 link-item"}>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      }
      <BackTop style={{
        right:"30px"
      }}></BackTop>
    </>
  );
}
export default Layout;
Layout.propTypes = {
  children: PropTypes.any
};

Layout.defaultProps = {
  children: null
};
