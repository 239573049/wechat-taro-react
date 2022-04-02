import React from "react";
import Taro from "@tarojs/taro";
import ApplicationRecordApi from '../../../apis/groups/applicationRecord'
import { AtAvatar, AtButton, AtList, AtMessage, AtPagination, AtTag } from "taro-ui";
import './index.less'
import ApplicationRecordDto from '../../../models/groups/applicationRecordDto'
import { View } from "@tarojs/components";
interface IState {
  data: {
    count: number,
    data: any[],
    pageNo: number,
    pageSize: number
  }
}
interface IProps {

}
class ApplicationRecord extends React.Component<IProps, IState>{
  state: IState = {
    data: {
      count: 0,
      data: [],
      pageNo: 1,
      pageSize: 20
    }
  }

  componentDidShow() {
    this.GetApplicationRecordPage()
  }
  onPageChange(type, size) {
    console.log(type, size);
  }
  GetApplicationRecordPage() {
    var { data } = this.state;
    ApplicationRecordApi.GetApplicationRecordPage(data.pageNo, data.pageSize)
      .then((res: any) => {
        data.data=res.data.data;
        data.count = res.data.count;
        this.setState({ data})
      })
  }
  ApplyForDealWith(id: string, isRefuse: boolean) {
    ApplicationRecordApi.ApplyForDealWith(id, isRefuse)
      .then((res: any) => {
        if (res.code === 200) {
          Taro.atMessage({ message: "操作成功", type: "success" })
          this.GetApplicationRecordPage()
        }
      })
  }
  render(): React.ReactNode {
    var { data } = this.state;
    var list=data.data;
    let mapList = list.map(a => {
      return (
        <View className='at-row'>
          <View className='at-col at-col-1 at-col--auto'>
            <AtAvatar circle image={a?.addInformation?.chatHead} ></AtAvatar>
          </View>
          <view className="userInfoData">
            <View className='at-col'>昵称：{a?.addInformation?.name}</View>
            招呼信息：<view className="information">{a?.remark}</view>
          </view>
          {a?.friendStatue === 0 ? (<view className="operation-view"><AtButton className="operation" onClick={() => { this.ApplyForDealWith(a.id, true) }}>同意</AtButton><AtButton className="operation" onClick={() => { this.ApplyForDealWith(a?.id, true) }}>拒绝</AtButton></view>)
            : (<AtTag type='primary' circle>{a?.friendStatue === 1 ? "成功" : "拒绝"}</AtTag>)}
        </View>
      )
    })

    return (
      <view style={{height:'100%'}}>
        <AtMessage />
        <AtList className="content">
          {mapList}
        </AtList>
        <view className="paging">
          <AtPagination
            total={data.count}
            pageSize={data.pageSize}
            current={data.pageNo}
            onPageChange={this.onPageChange.bind(this)}
          />
        </view>
      </view>
    )
  }
}
export default ApplicationRecord
