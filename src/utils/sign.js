import CryptoJS from 'crypto-js';

const EQUAL = '=';
const AND = '&';

/**
 * 签名方法入口
 * @param {Object} requestParams - 包含 query 参数和 body 参数的对象
 * @returns {string} 签名字符串
 */
export function signParamStr(requestParams) {
  const treeMap = {};

  // 获取 queryParams 和 body 并合并到 treeMap
  if (requestParams.queryParams) {
    Object.assign(treeMap, requestParams.queryParams);
  }
  if (requestParams.body) {
    Object.assign(treeMap, requestParams.body);
  }

  const paramsStr = getSignParamStrV2(treeMap);

  return generateHmacSHA256Signature(paramsStr, "an1&yst%@arr-ne1fw-we5b-2!0@2#4$b");
}

/**
 * 生成 HMAC-SHA256 签名
 * @param {string} data - 待签名的数据
 * @param {string} key - 密钥
 * @returns {string} 签名字符串（以 Hex 表示）
 */
function generateHmacSHA256Signature(data, key) {
  const hmac = CryptoJS.HmacSHA256(data, key);
  const signature = hmac.toString(CryptoJS.enc.Hex);
  return signature;
}



/**
 * 计算签名字符串：按键名排序并拼接
 * @param {Object} treeMap - 排序后的参数对象
 * @returns {string} 签名字符串
 */
function getSignParamStrV2(treeMap) {
  const stringBuffer = [];
  const adapterParamMap = {};

  // 展平复杂对象
  Object.keys(treeMap)
    .sort()
    .forEach((key) => {
      const value = treeMap[key];
      if (value !== null && value !== '') {
        if (Array.isArray(value) || isObject(value)) {
          Object.assign(adapterParamMap, spreadOutToMap(key, value));
        } else {
          adapterParamMap[key] = value;
        }
      }
    });

  // 拼接成签名字符串
  Object.keys(adapterParamMap)
    .sort()
    .forEach((key) => {
      const value = adapterParamMap[key];
      if (value !== null) {
        stringBuffer.push(`${key}${EQUAL}${value}`);
      }
    });

  return stringBuffer.join(AND);
}

/**
 * 展平嵌套结构
 * @param {string} keyPrefix - 键名前缀
 * @param {any} value - 值
 * @returns {Object} 展平后的对象
 */
function spreadOutToMap(keyPrefix, value) {
  const flatMap = {};
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      const newKey = `${keyPrefix}[${index}]`;
      if (Array.isArray(item) || isObject(item)) {
        Object.assign(flatMap, spreadOutToMap(newKey, item));
      } else {
        flatMap[newKey] = item;
      }
    });
  } else if (isObject(value)) {
    Object.keys(value).forEach((key) => {
      const newKey = `${keyPrefix}.${key}`;
      if (Array.isArray(value[key]) || isObject(value[key])) {
        Object.assign(flatMap, spreadOutToMap(newKey, value[key]));
      } else {
        flatMap[newKey] = value[key];
      }
    });
  }
  return flatMap;
}

/**
 * 判断是否为对象
 * @param {any} value - 值
 * @returns {boolean} 是否为对象
 */
function isObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}
