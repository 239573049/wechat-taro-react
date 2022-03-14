import React from "react";
import UserInfoDto from "../../../models/user/userInfoDto";
import Taro from '@tarojs/taro'
import { AtButton, AtForm, AtInput, AtMessage, AtRadio } from "taro-ui";
import UserInfoApi from '../../../apis/userInfo/index'
import './index.less'
interface IState {
  userInfo: UserInfoDto
}
interface IProps {
}
class EditUser extends React.Component<IProps, IState>{
  state: Readonly<IState> = {
    userInfo: undefined,
  }
  componentDidMount(): void {
    UserInfoApi.GetUserInfo()
      .then((res:any)=>{
        if(res.code===200){
          this.setState({userInfo:res.data})
        }
      })
  }
  handleChange (name:any,value:any) {
    var {userInfo}=this.state
    userInfo[name]=value;
    this.setState({userInfo})
  }
  onSubmit() {
    var {userInfo}=this.state
    UserInfoApi.UpdateUserInfo(userInfo)
      .then((res:any)=>{
        if(res.code===200){
          Taro.setStorageSync('userInfo', res.data)
          Taro.atMessage({
            'message': '编辑成功',
            'type':'success',
          });
        }else{
          Taro.atMessage({type:'error',message:res.message})
        }
      })
  }
  render(): React.ReactNode {
    var {userInfo}=this.state;
    return (
      <view>
        <AtMessage />
        <AtForm
        >
        <AtInput
          name='name'
          title='昵称'
          type='text'
          placeholder=''
          value={userInfo?.name}
          onChange={this.handleChange.bind(this, 'name')}
        />
        <AtInput
          name='description'
          title='描述'
          type='text'
          placeholder=''
          value={userInfo?.description}
          onChange={this.handleChange.bind(this, 'description')}
        />
        <AtInput
          name='eMail'
          title='邮箱'
          type='text'
          placeholder=''
          value={userInfo?.eMail}
          onChange={this.handleChange.bind(this, 'eMail')}
        />
        <AtInput
          name='mobile'
          title='手机号'
          type='phone'
          placeholder=''
          value={userInfo?.mobile as any}
          onChange={this.handleChange.bind(this, 'mobile')}
        />
        <text>性别</text>
        <AtRadio
        options={[
          { label: '未知', value: 0},
          { label: '男生', value: 1},
          { label: '女生', value: 2},
        ]}
        value={userInfo?.sex}
        onClick={this.handleChange.bind(this, 'sex')}
      />
          <AtButton onClick={()=>{this.onSubmit()}}>提交</AtButton>
        </AtForm>
      </view>
    )
  }
}
export default EditUser
