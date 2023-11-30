import PropTypes from 'prop-types';
import DynamicAntdTheme from 'dynamic-antd-theme';
import Header from './Header';
function Layout({ children }) {
  return (
    <>
      <style jsx>{`
        .content-container {
           margin-top: 60px;
        }
      `}</style>
      <Header />
      <div className='content-container'>
        {children}
      </div>
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
