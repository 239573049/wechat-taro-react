import React from "react";
import Taro from '@tarojs/taro'
import { Button, Text, View } from "@tarojs/components";
import { AtAvatar } from 'taro-ui'
import UserInfoDto from '../../models/user/userInfoDto'
import Login from '../../apis/login/index'
import './index.less'
interface IState {
  user: {
    isLogin: boolean,
    userInfo: UserInfoDto
  }
}
interface IProps {

}
class My extends React.Component<IProps, IState>{

  state: IState = {
    user: {
      isLogin: false,
      userInfo: undefined,
    }
  }
  componentDidMount(): void {
    var { user } = this.state
    var userInfo = Taro.getStorageSync('userInfo');
    if (userInfo) {
      user.isLogin = true
      user.userInfo = userInfo;
    } else {
      user.isLogin = false;
    }
    this.setState({ user })
  }
  onLoginClick() {
    var This = this;
    Taro.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        var userInfo = res.userInfo;
        Taro.login({
          success: function (res) {
            if (res.code) {
              Login.WXLogin(res.code, userInfo.nickName, userInfo.avatarUrl)
                .then((res: any) => {
                  if (res.code === 200) {
                    var token = res.data.token;
                    var userInfo = res.data.user;
                    Taro.setStorageSync('token', token)
                    Taro.setStorageSync('userInfo', userInfo)
                    var { user } = This.state;
                    user.isLogin = true;
                    user.userInfo = userInfo as UserInfoDto;
                    This.setState({ user })
                  }
                }).catch(err => {
                  console.log(err);

                })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })

  }

  render(): React.ReactNode {
    var { user } = this.state;
    let status = null;
    if (!user.isLogin) {
      status = <view><Button onClick={() => { this.onLoginClick() }}>
        点击登录
      </Button>
      </view>
    } else {
      status =
        <view>
          <view className="userInfo">

          <View className='at-row'>
            <View className='at-col at-col-1 at-col--auto'>
              <AtAvatar circle image={user.userInfo?.chatHead} ></AtAvatar>
            </View>
            <View className='at-col'>{user.userInfo?.name}</View>
          </View>
          </view>
        </view>
    }
    return (
      <view>
        {status}
      </view>
    )
  }

}
export default My
