import Head from 'next/head';
import { wrapper } from '../redux/store';
import Layout from '../components/Layout';
import 'antd/dist/antd.css';
import '../../assets/global.css';
import '../config/i18n';
function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <title>anystarr</title>
        <link rel='shortcut icon' href='/favicon.jpeg' type='image/ico'/>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}


export default wrapper.withRedux(App);
