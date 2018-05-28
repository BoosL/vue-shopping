/**
 *
 * 调用示例：
 * let formData = new FormData();
 *formData.append("id",1060);
 *
 *$http.post(url,formData,headers).then((json) => {
 * //处理 请求success
 *  	if(json.code === 0 ){
 *          //我们假设业务定义code为0时，数据正常
 *      }else{
 *           //处理自定义异常
 *          this.doException(json);
 *      }
 * },(json)=>{
 *   //处理请求fail
 *
 * })
 */
//import 'whatwg-fetch'
import Fun from './index';
import base64_encode from '../utils/base64_encode';
import { Indicator, Toast } from 'mint-ui';

var heads = { 'Content-Type': 'application/json' };
export default {
  //封装的 GET请求
  get(url, params, message) {
    let i = Fun.getKeyByI();
    let mid = Fun.getKeyByMid();
    let type = Fun.getTyep();
    let shop_id = Fun.getKeyByMicroShopId();
    let baseUrl = '';
    if (mid) {
      baseUrl = '/addons/yun_shop/api.php?i=' + i + '&mid=' + mid + '&type=' + type + '&shop_id=' + shop_id + '&route=';
    } else {
      baseUrl = '/addons/yun_shop/api.php?i=' + i + '&type=' + type + '&shop_id=' + shop_id + '&route=';
    }
    if ((message == null) || (message == undefined)) {
      Indicator.close();
    } else {
      Indicator.open(message);

    }
    if (params) {
      let paramsArray = [];
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      url += '&' + paramsArray.join('&');
      url = baseUrl + url;
    } else {
      url = baseUrl + url;
    }

    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
        .then((response) => {
          if (response.ok) {
            Indicator.close();
            return response.json();
          } else {
            Indicator.close();
            reject({ status: response.status })
          }
        })
        .then((response) => {
          if (response.result == 0 && !Fun.isTextEmpty(response.data) && response.data.status == -3) {
            window.location.href = Fun.getSiteRoot() + "/addons/yun_shop/" + "?#" + "/member/mandate";
            return;
          }
          if (response.result == 0 && !Fun.isTextEmpty(response.data) && response.data.status == -2) {
            window.location.href = Fun.getSiteRoot() + "/addons/yun_shop/" + "?#" + "/404";
            return;
          }
          if (response.result == 0 && !Fun.isTextEmpty(response.data) && response.data.login_status != undefined && response.data.login_status == 0) {

            window.location.href = response.data.login_url + '&yz_redirect=' + base64_encode(document.location.href) + "&mid" + response.data.mid;
            return;
          } else if (response.result == 0 && !Fun.isTextEmpty(response.data) && response.data.login_status != undefined && response.data.login_status == 1) {
            window.location.href = Fun.getSiteRoot() + "/addons/yun_shop/" + "?#" + "/login?i=" + response.data.i + "&type=" + response.data.type + "&mid=" + response.data.mid;
            console.log("无权限，跳入登录入口");
            return;
          } else {
            return response;
          }
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          Indicator.close();
          //console.log('网络请求，无响应！');
          reject({ status: -1 });
        })
    })
  },
  // POST请求  FormData 表单数据

  post(url, formData, message) {
    let i = Fun.getKeyByI();
    let mid = Fun.getKeyByMid();
    let type = Fun.getTyep();
    let shop_id = Fun.getKeyByMicroShopId();
    let baseUrl = '';
    if (mid) {
      baseUrl = '/addons/yun_shop/api.php?i=' + i + '&mid=' + mid + '&type=' + type + '&shop_id=' + shop_id + '&route=';
    } else {
      baseUrl = '/addons/yun_shop/api.php?i=' + i + '&type=' + type + '&shop_id=' + shop_id + '&route=';
    };
    if ((message == null) || (message == undefined)) {
      Indicator.close();
    } else {
      Indicator.open(message);

    }
    return new Promise(function (resolve, reject) {

      url = baseUrl + url;
      fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: 'include'
      })
        .then((response) => {
          if (response.ok) {
            Indicator.close();

            return response.json();
          } else {
            Indicator.close();
            Toast(response.status);
            reject({ status: response.status })
          }
        })
        .then((response) => {
          if (response.result == 0 && !Fun.isTextEmpty(response.data) && response.data.login_status == -1) {
            window.location.href = Fun.getSiteRoot() + "/addons/yun_shop/" + "?#" + "/member/blacklist";
            return;

          }
          if (response.result == 0 && !Fun.isTextEmpty(response.data) && response.data.status == -3) {
            window.location.href = Fun.getSiteRoot() + "/addons/yun_shop/" + "?#" + "/member/mandate";
            return;

          }
          if (response.result == 0 && !Fun.isTextEmpty(response.data) && response.data.status == -2) {
            window.location.href = Fun.getSiteRoot() + "/addons/yun_shop/" + "?#" + "/404";
            return;
          }
          if (response.result == 0 && !Fun.isTextEmpty(response.data) && response.data.login_status != undefined && response.data.login_status == 0) {
            window.location.href = response.data.login_url + '&yz_redirect=' + base64_encode(document.location.href) + "&mid" + response.data.mid;
            return;
          } else if (response.result == 0 && !Fun.isTextEmpty(response.data) && response.data.login_status != undefined && response.data.login_status == 1) {
            window.location.href = Fun.getSiteRoot() + "/addons/yun_shop/" + "?#" + "/login?i=" + + response.data.i + "&type=" + response.data.type + "&mid" + response.data.mid;
            return;
          } else {
            return response;
          }

        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          Indicator.close();
          //console.log('网络请求，无响应！');
          reject({ status: -1 });
        })
    })
  }
}