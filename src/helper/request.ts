import Taro from "@tarojs/taro";

const request = ({
  url,
  data = {},
  method,
  header = {}
}) => {
  const BASE_URL = "http://localhost:8881/api/"
  var token = Taro.getStorageSync('token')
  const handleHeader = {
    'content-type': 'application/json',
    'Authorization': '',
    ...header
  }
  if (token) {
    handleHeader.Authorization = "Bearer "+token
  } else {
    delete handleHeader.Authorization
  }
  return new Promise((resolve, reject) => {
    Taro.request({
      url: `${BASE_URL}${url}`, //仅为示例，并非真实的接口地址
      data,
      method:method,
      header: handleHeader,
      success: function (res) {
        resolve(res.data);
      },
      fail(e) {
        reject(e)
      }
    })
  })
}

export default request
