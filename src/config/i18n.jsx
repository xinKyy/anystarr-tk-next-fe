import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from "i18next";
import enUsTrans from "../../public/locales/en-us.json";
import zhCNTrans from "../../public/locales/zh-cn.json";
import krTrans from "../../public/locales/kr-kr.json";
import jpTrans from "../../public/locales/jp-jp.json";
import {
  initReactI18next
} from 'react-i18next';

i18n.use(LanguageDetector) // 嗅探当前浏览器语言
.use(initReactI18next) // init i18next
.init({
  // 引入资源文件
  resources: {
    en: {
      translation: enUsTrans,
    },
    cn: {
      translation: zhCNTrans,
    },
    kr:{
      translation: krTrans,
    },
    jp:{
      translation: jpTrans,
    }
  },
  // 选择默认语言，选择内容为上述配置中的key，即en/zh
  fallbackLng: "cn",
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
