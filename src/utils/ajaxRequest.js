import $ from 'jquery';
import {
    dealResult
} from './dealResult';
// import Headers from './headers';
import {
    message
} from 'antd';
import host from "@/utils/host";
import {signParamStr} from "@/utils/sign";


// 普通请求（会验证登录）
function ajaxRequest(methods, url, params, contentType) {
    return new Promise((resolve, reject) => {
        let token = localStorage.getItem('token');
        $.ajax({
            type: methods,
            url: host + url,
            data: params,
            dataType: 'json',
            contentType: contentType === 'json' ? 'application/json' : 'application/x-www-form-urlencoded',
            // headers: headers,
            beforeSend: function (request) {
                const signStr = signParamStr( contentType === 'json' ? JSON.parse(params) : params);
                request.setRequestHeader('Sign', signStr);
                if (window.location.href.includes("anystarr.shop")){
                  request.setRequestHeader('test', true);
                }
                if (token){
                    request.setRequestHeader('token', token);
                    request.setRequestHeader("Access-Control-Allow-Origin", "*");
                    request.setRequestHeader("Authorization", `Bearer ${token}`);
                }
            },
            xhrFields: {
                withCredentials: true,
            },
            crossDomain: true,
            // withCredentials: true,
            success: resp => {
                let flag = dealResult(resp);
                flag.then(res => {
                    if (res === 'unLogin') {
                        reject();
                    } else if (!res) {
                        message.error(resp.resultMessage || 'System error');
                        return reject(resp.resultMessage);
                    } else {
                        resolve(resp);
                    }
                });
            },
            error: err => {
              if (err.status === 401){
                message.error("Login expired!");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setTimeout(() => {
                  window.location.href = "/beta";
                }, 1000);
              } else {
                // message.error(err.statusText);
              }
              reject(err);
            }
        });
    });
}
// 普通请求（不验证登录）
function ajaxRequestUnDeal(methods, url, params, contentType) {
    return new Promise((resolve, reject) => {
        let token = localStorage.getItem('token') || localStorage.getItem('fk-token') ;
        $.ajax({
            type: methods,
            url: host + url,
            data: params,
            dataType: 'json',
            contentType: contentType === 'json' ? 'application/json' : 'application/x-www-form-urlencoded',
            // headers: headers,
            beforeSend: function (request) {
                if (token){
                    request.setRequestHeader('token', token);
                    request.setRequestHeader("Access-Control-Allow-Origin", "*");
                }
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            // withCredentials: true,
            success: resp => {
                resolve(resp);
            },
            error: err => {
                reject(err);
            }
        });
    });
}
// 上传文件
function ajaxRequestUpload(methods, url, params) {
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        let fileType = params.file.type.split('/')[0];
        formData.append('file', params.file);
        formData.append('type', fileType);
        $.ajax({
            type: methods,
            url: host + url,
            processData: false,
            data: formData,
            // dataType: 'json',
            contentType: false,
            success: resp => {
                let flog = dealResult(resp);
                if (!flog) {
                    message.error(resp.msg);
                    return;
                }
                resolve(resp);
            },
            error: err => {
                console.log('error', err);
                reject(err);
            }
        });
    });
}
// 下载文件
function ajaxRequestFile(methods, url, params) {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token') || localStorage.getItem('fk-token');
        $.ajax({
            type: methods,
            url: host + url,
            data: params,
            xhrFields: {
                responseType: "arraybuffer"
            },
            beforeSend: function (request) {
                request.setRequestHeader('token', token);
            },
            withCredentials: true,
            success: (resp, status, xhr) => {
                let filename = "";
                let disposition = xhr.getResponseHeader('Content-Disposition');
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    let matches = filenameRegex.exec(disposition);
                    if (matches !== null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                    }
                }



                // let fileName = Disposition.split(";")[1]
                // let fileName = 'code.csv'
                let content = resp;
                let blob = new Blob([content], {
                    type: "application/vnd.ms-excel"
                });
                if ("download" in document.createElement("a")) {
                    // 非IE下载
                    let link = document.createElement("a");
                    link.download = filename;
                    link.style.display = "none";
                    link.href = URL.createObjectURL(blob);
                    document.body.appendChild(link);
                    link.click();
                    URL.revokeObjectURL(link.href); // 释放URL 对象
                    document.body.removeChild(link);
                } else {
                    // IE10+下载
                    navigator.msSaveBlob(blob);
                }
            },
            error: (err, status, xhr) => {
                reject(err, status, xhr);
            }
        });
    });

}

const ajax = {
    post(url, params) {
        return ajaxRequest('POST', url, params, '');
    },
    delete(url, params) {
        return ajaxRequest('DELETE', url, params, '');
    },
    get(url, params, token) {
        return ajaxRequest('GET', url, params, '', token);
    },
    upload(url, params) {
        return ajaxRequestUpload('POST', url, params);
    },
    postJson(url, params,) {
       return ajaxRequest('POST', url, params, 'json');
    },
    getJson(url, params,) {
       return ajaxRequest('GET', url, params, 'json');
    },
    downloadFile(url, params) {
        return ajaxRequestFile('GET', url, params);
    },
    get_unDeal(url, params, token) {
        return ajaxRequestUnDeal('GET', url, params, '', token);
    },
    post_unDeal(url, params, token) {
        return ajaxRequestUnDeal('post', url, params, '', token);
    },
    postJson_unDeal(url, params, token ) {
        return ajaxRequestUnDeal('post', url, params, 'json', token);
    }
};

export default ajax;
