import React from "react";
import Taro from '@tarojs/taro'
import { QRCode } from 'taro-code'
import { Button, Text, View } from "@tarojs/components";
import { AtAvatar, AtList, AtListItem, AtModal, AtModalAction, AtModalContent, AtModalHeader } from 'taro-ui'
import UserInfoDto from '../../models/user/userInfoDto'
import Login from '../../apis/login/index'
import './index.less'
import { HubConnection } from '../../helper/signalr'
import config from '../../config'
interface IState {
  user: {
    isLogin: boolean,
    userInfo: UserInfoDto
  },
  isOpenEditUser: boolean,
  isOpenChat: boolean,
  chat: any,
  isOpenQr: boolean
}
interface IProps {

}
class My extends React.Component<IProps, IState>{
  state: IState = {
    user: {
      isLogin: false,
      userInfo: undefined,
    },
    isOpenEditUser: false,
    isOpenChat: false,
    chat: undefined,
    isOpenQr: false
  }

  componentDidShow() {
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
                    var chat = new HubConnection().start("chatpush");
                    This.setState({ user, chat })

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
  logout() {
    var { user } = this.state;
    user.isLogin = false;
    user.userInfo = undefined;
    Taro.removeStorageSync('userInfo')
    Taro.removeStorageSync('token')
    this.setState({ user })
  }
  OpenEditUser() {
    Taro.navigateTo({
      url: 'edituser/index'
    })
  }
  addFirend() {
    // 允许从相机和相册扫码
    Taro.scanCode({
      success: (res) => {
        console.log(res.result)
      }
    })
    // 只允许从相机扫码
    Taro.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res.result)
      }
    })
  }
  
  render(): React.ReactNode {
    var { user, isOpenQr } = this.state;
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
              <view className="userInfoData">
                <View className='at-col'>昵称：{user.userInfo?.name}</View>
                <View className="description">描述：{user.userInfo?.description}</View>
                <view className="qr" onClick={() => {
                  this.setState({ isOpenQr: true })
                }}>
                  <AtAvatar image='https://xiaohuchat.oss-cn-beijing.aliyuncs.com/icon/qr.png'></AtAvatar>
                </view>
              </view>
            </View>
          </view>
          <view className="userSet">
            <AtList>
              <AtListItem
                title='编辑个人信息'
                arrow='right'
                thumb='https://xiaohuchat.oss-cn-beijing.aliyuncs.com/icon/edit-information.png'
                onClick={() => {
                  this.OpenEditUser()
                }}
              />
              <AtListItem
                title='修改密码'
                arrow='right'
                thumb='https://xiaohuchat.oss-cn-beijing.aliyuncs.com/icon/change-password.png'
              />
              <AtListItem
                onClick={() => { this.addFirend() }}
                title='添加好友'
                arrow='right'
                thumb='https://xiaohuchat.oss-cn-beijing.aliyuncs.com/icon/addfriends.png'
              />
              <AtListItem
                title='好友申请记录'
                arrow='right'
                thumb='https://xiaohuchat.oss-cn-beijing.aliyuncs.com/icon/applicationrecord.png'
              />
              <AtListItem
                title='退出登录'
                arrow='right'
                onClick={() => { this.logout() }}
                thumb='https://xiaohuchat.oss-cn-beijing.aliyuncs.com/icon/log-out.png'
              />
            </AtList>
          </view>
          <AtModal isOpened={isOpenQr}>
            <AtModalHeader>您的二维码</AtModalHeader>
            <AtModalContent>
              <QRCode
                text={config.baseUrl + "api/UserInfo/GetUserById?id=" + user.userInfo.id}
                size={200} // 二维码的大小

                style={{ margin: 'auto' }}
              />
            </AtModalContent>
            <AtModalAction><Button onClick={() => { this.setState({ isOpenQr: false }) }}>确定</Button> </AtModalAction>
          </AtModal>
        </view>
    }
    return (
      <view>
        {status}
        {/* <EditUser {...this.props} isOpenedEditUser={this.state.isOpenEditUser} OpenEditUser={(isOpen)=>{this.OpenEditUser(isOpen)}}/> */}
      </view>
    )
  }

}
export default My
