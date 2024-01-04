export const numSubString = (num) => {
  try {
    // 将数字转换为字符串
    let numStr = num.toString();

    // 查找小数点的位置
    let dotIndex = numStr.indexOf('.');

    // 如果存在小数点且小数点后有四位或更多数字
    if (dotIndex !== -1 && numStr.length - dotIndex > 4) {
      // 截取前四位小数
      return numStr.slice(0, dotIndex + 5);
    }
    return numStr;
  } catch (e) {
    // 如果出现异常，返回默认值
    return 0;
  }
};

