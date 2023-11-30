![](./next-antd-scaffold.jpg)
A simple scaffold based on Next.js for quick use with ant-design, redux, redux-saga, fetch and pm2.

English | [简体中文](./README_zh_CN.md)

[![build-passing](https://img.shields.io/badge/build-passing-brightgreen)](https://next-antd-scaffold.luffyzh.now.sh/)
![MIT License](https://img.shields.io/badge/license-MIT-blue)
[![Made By Vercel](https://camo.githubusercontent.com/0c94840282c8835b189cd4e739e96a2f5cb25795c1d3f1e797134d9455124f46/68747470733a2f2f62616467656e2e6e65742f62616467652f69636f6e2f4d616465253230627925323056657263656c3f69636f6e3d7a656974266c6162656c26636f6c6f723d626c61636b266c6162656c436f6c6f723d626c61636b)](https://next-antd-scaffold.luffyzh.now.sh/)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/zeit)

## 🏠 HomePage

[Next-Antd-Scaffold-Demo](https://next-antd-scaffold.luffyzh.now.sh/)

> If you like use the next version is lower version 11. Please check more version from there [🌲 Versions History](https://github.com/luffyZh/next-antd-scaffold/releases).

## 🌍 Browser Support

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Chrome 39.0+ ✔                                                                           | Edge 12.0+ ✔                                                                       | Firefox 30.0+ ✔                                                                             | IE 11+ ✔                                                                                                                     | Safari 9.1+ ✔                                                                            |

## 📁 Directory

```
——————
  | -- assets                    // ant-design global less var
  | -- docs                      // documents directory
  | -- public                    // static files directory
      | -- static                // compatible with < version 9.0
      | -- favicon.ico           // some files examples like seo files
      | -- ...
  | -- src                       // source directory
      | -- components            // React UI component
      | -- constants             // constant directory
          | -- ActionsTypes.js   // save all action type
          | -- ApiUrlForBE.js    // save all apiUrl
          | -- ...
      | -- core                  // mehtod dirctory
          | -- util.js           // project method
          | -- nextFetch.js      // packing unfetch for easy use
      | -- middlewares           // middlewares
          | -- client            // client middlewares, deal redux action
          | -- server            // server middlewares, deal node event
      | -- pages                 // Next.js routes
      | -- redux                 // redux directory
          | -- actions           // deal all project actions
          | -- reducers          // deal all project reducers
          | -- sagas             // sace all project sagas
          | -- store.js          // the store of project
  | -- .babelrc              // babel config file
  | -- .eslintrc             // eslint config file
  | -- .gitignore
  | -- next.config.js        // Next.js config file
  | -- package.json
  | -- server.js             // server file
  | -- pm2.config.js         // pm2 deploy config file
  | ...                      // other files
```

## 📖 Usage

#### development

```
 1. git clone https://github.com/luffyZh/next-antd-scafflod.git
 2. yarn install
 3. yarn start
```

> The application is ready on http://localhost:3006

#### production

```
 1. yarn build
 2. yarn prod
```

> The application is ready on http://localhost:5999

## ✨ Features

- React
- Next.js
- Redux
- Redux-Saga
- Ant-Design
- Fetch

## 🔨 How to depoly application by pm2

```bash
# 1. install pm2
$ npm install -g pm2

# 2. build project
$ yarn build

# 3. pm2 deploy project
$ pm2 start pm2.config.js
```

## 🪂 Deploy By now

<a target='__blank' href='https://zeit.co/now'><img src='https://avatars3.githubusercontent.com/in/8329?s=60&u=35934eb25f938206da3c68530ac900e2717abbc3&v=4' /></a>

## 🌲 Versions History

### [next_version_11](https://github.com/luffyZh/next-antd-scaffold/releases/tag/v1.4)

- webpack 5

### [next_version_10](https://github.com/luffyZh/next-antd-scaffold/releases/tag/v1.3)

- All hooks API (Component/Redux)

### [next_verion_9.3.5](https://github.com/luffyZh/next-antd-scaffold/releases/tag/v1.1)

### [next_verion_8.1.0](https://github.com/luffyZh/next-antd-scaffold/releases/tag/v1.0)

## 💐 More Demo

- Full Stack Demo —— [Branch_backend](https://github.com/luffyZh/next-antd-scaffold/tree/backend)
- Auth && Verify Demo —— [Branch_auth](https://github.com/luffyZh/next-antd-scaffold/tree/auth)
- Server Error Demo —— [Branch_server-error](https://github.com/luffyZh/next-antd-scaffold/tree/server-error)

## 🤔️ More Questions

- How to listen for routing changes?

- The solution of `min-css-extract-plugin` warning in the console!

- How to polyfill IE10/IE9 in this scaffold?

- The ant-design style flash when page refresh!

- The solution of `ant-design` in the development environment style load is incomplete.

- How to speed up packing in production?

...

Please check the [Faq documentation](./docs/FAQ.md)
