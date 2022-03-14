import React from "react";
import Taro from '@tarojs/taro'
import { Button } from "@tarojs/components";
import { AtAvatar } from 'taro-ui'
import './index.less'
interface IState{
    user:{
      isLogin:boolean,
    }
}
interface IProps{

}
class My extends React.Component<IProps,IState>{

  state:IState={
    user: {
      isLogin: false
    }
  }
  loginView=()=>{
    var {user}=this.state;
    let status = null;
    if(user.isLogin){
      status=<view><Button onClick={()=>{this.onLoginClick()}}>
          点击登录
          </Button>
      </view>
    }else{
      status=<view>

      </view>
    }
  }
  componentDidMount(): void {
    var {user}=this.state
    var userSession= Taro.getStorageSync('user');
    if(userSession){
      user.isLogin=true
    }else{
      user.isLogin=false;
    }
    this.setState({user})
  }
  onLoginClick(){
    Taro.login({
      success: function (res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          Taro.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
          const accountInfo = Taro.getAccountInfoSync();
          console.log(accountInfo.miniProgram.appId)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

  render(): React.ReactNode {
    var {user}=this.state;
    return(
      <view>
        <view className={user.isLogin?"not-login":"login"}>
          <Button onClick={()=>{this.onLoginClick()}}>
          点击登录
          </Button>
        </view>
        <view className={user.isLogin?"login":"not-login"}>


        </view>
      </view>
    )
  }

}
export default My
