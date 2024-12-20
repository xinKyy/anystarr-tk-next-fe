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

// 获取商品一级类目
export const APIGetCategoryFirst = () => {
  return ajaxRequest.get(`/api/v1/category/first`, {});
};

// 根据一级获取二级类目
export const APIGetCategorySecond = (params) => {
  return ajaxRequest.get(`/api/v1/category/sub`, params);
};

// 获取推荐商品
export const APIGetRecommendList = () => {
  return ajaxRequest.post(`/api/v1/recommend/list`, {});
};

// 一键加橱链接生成
export const APICreatLinkByPid = (params) => {
  return ajaxRequest.postJson(`/api/v1/favoriteItems/creatLink`, params);
};

// 获取一键加橱链接
export const APIGetLinkByBatchId = (batchId) => {
  return ajaxRequest.get(`/api/v1/favoriteItems/queryLink`, {batchId});
};


export const APIGetLinkByPid = (productId) => {
  return ajaxRequest.get(`/api/v1/product/getNewLink`, {productId});
};
