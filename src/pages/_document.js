// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <style>{`
            body {
              position: absolute;
              top: 0;
              background-color: #f3f3f3;
            }
          `}</style>

          <script async src={"https://www.googletagmanager.com/gtag/js?id=G-RGC7VTRCE4"}></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments)}
                gtag('js', new Date());
                const user = localStorage.getItem("user");
                let displayName = "unLoginUser";
                if (user){
                  displayName = JSON.parse(user).displayName
                }
                gtag('config', 'G-RGC7VTRCE4', {
                 'user_id': displayName
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
