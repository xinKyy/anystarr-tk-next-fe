import ajaxRequest from "@/utils/ajaxRequest";
export const APIGetProductList = (params) => {
  return ajaxRequest.postJson(`/api/v1/product/list`, params);
};

// 获取收藏列表
export const APIGetLikeProductList = (params) => {
  return ajaxRequest.postJson(`/api/v1/favoriteItems/list`, params);
};

// 用户信息
export const APIGetUserInfo = () => {
  return ajaxRequest.get(`/api/v1/user/get`, {});
};

// {productId:string} // 获取商品详情
export const APIGetProductInfo = (params) => {
  return ajaxRequest.get(`/api/v1/product/getProduct`, params);
};

// {uid:string, itemId:string} // 增加收藏
export const APIAddFavoriteItems = (params) => {
  return ajaxRequest.get(`/api/v1/favoriteItems/add`, params);
};

// {collectId:string} // 删除收藏
export const APIDeleteFavoriteItems = (params) => {
  return ajaxRequest.get(`/api/v1/favoriteItems/remove`, params);
};

// {collectId:string} // 检查是否收藏
export const APICheckCollect = (params) => {
  return ajaxRequest.get(`/api/v1/favoriteItems/checkCollect`, params);
};
