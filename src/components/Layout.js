import PropTypes from 'prop-types';
import DynamicAntdTheme from 'dynamic-antd-theme';
import Header from './Header';
import {BackTop} from "antd";
import ConnectTikTipsModal from "@/components/connectTikTipsModal";
function Layout({ children }) {
  return (
    <>
      <style jsx>{`
        .content-container {
          padding-top: 60px;
        }
      `}</style>
      <Header />
      <div className='content-container'>
        {children}
      </div>
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
