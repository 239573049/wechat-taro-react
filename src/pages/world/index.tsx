import React from "react";
import { AtAvatar, AtButton, AtIcon, AtInput, AtList } from "taro-ui";
import './index.less'
interface IState {
  worldData: string | undefined
}
interface IProps {

}
class World extends React.Component<IProps, IState>{
  state: IState = {
    worldData: ""
  }
  worldDataChange(data: any) {
    this.setState({ worldData: data })
  }
  render(): React.ReactNode {
    return (
      <AtList className="world-list">
        <view className="world-content">

        </view>
        <view className="world-send">
          <AtAvatar image='https://xiaohuchat.oss-cn-beijing.aliyuncs.com/icon/voice.png'></AtAvatar>
          <AtInput
            className="world-input"
            name='worldData'
            type='text'
            placeholder='单行文本'
            value={this.state.worldData}
            onChange={this.worldDataChange.bind(this)}
          />
        </view>
      </AtList>
    )
  }

}
export default World
