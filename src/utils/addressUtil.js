export const splitWalletAddress = (address) =>{
  if (address) {
    address = address.substring(0, 6) + "***" + address.substring(address.length - 4, address.length);
    return address;
  }
  return "";
};
