import ajaxRequest from "@/utils/ajaxRequest";
export const APIGetModAmount = (params) => {
  return ajaxRequest.get(`/api/mod-token/total`, params);
};

export const APIChangeModAmount = (params) => {
  return ajaxRequest.get(`/api/change/total`, params);
};


export const APIGetProductList = (params) => {
  return ajaxRequest.postJson(`/api/v1/product/list`, params);
};
