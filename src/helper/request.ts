import Taro from "@tarojs/taro";
import config from "../config";
import { AtMessage } from 'taro-ui'
const request = ({
  url,
  data = {},
  method,
  header = {}
}) => {
  const BASE_URL = config.baseUrl+"api/"
  var token = Taro.getStorageSync('token')
  const handleHeader = {
    'content-type': 'application/json',
    'Authorization': '',
    ...header
  }
  if (token) {
    handleHeader.Authorization = "Bearer " + token
  } else {
    delete handleHeader.Authorization
  }
  return new Promise((resolve, reject) => {
    Taro.request({
      url: `${BASE_URL}${url}`, //仅为示例，并非真实的接口地址
      data,
      method: method,
      header: handleHeader,
      success: function (res) {
        var data = res.data;
        if (data.code === 401) {
          Taro.removeStorageSync('userInfo')
          Taro.removeStorageSync('token')
          Taro.atMessage({'type':'error','message':data.message})
          Taro.navigateTo({url:'pages/my/pages/my/index'})
          resolve(res.data);
          return;
        }else if(data.code!=200){
          Taro.atMessage({'type':'error','message':data.message})
        }
        resolve(res.data);
      },
      fail(e) {
        reject(e)
      }
    })
  })
}

export default request
