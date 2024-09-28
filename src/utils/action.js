export const getQueryString = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r !== null) return unescape(r[2]);
  return null;
};


export const isMobile = () => {
  var sUserAgent =  window.navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) && sUserAgent.match(/ipad/i)[0]  === "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) === "iphone os" ;
  var bIsIphoneOsNew = sUserAgent.match(/iphone os/i) && sUserAgent.match(/iphone os/i)[0];

  var bIsMidp = sUserAgent.match(/midp/i) === "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) === "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) === "android";
  var bIsAndroidNew = sUserAgent.match(/android/i) && sUserAgent.match(/android/i)[0];
  var bIsCE = sUserAgent.match(/windows ce/i) === "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) === "windows mobile";

  var bIsMinWin = (window.innerWidth || ( document.body && document.body.clientWidth )) < 820;

  if (!( bIsMinWin || bIsIpad || bIsIphoneOs || bIsIphoneOsNew || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsAndroidNew || bIsCE || bIsWM)){
    return false;
  }
  return true;

};
