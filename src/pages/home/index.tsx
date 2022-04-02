import React from "react";
import { AtList, AtListItem } from "taro-ui"
import Warehouse from '../../warehouse'
interface IState {
  list: any[]
}
interface IProps {

}
class Home extends React.Component<IProps, IState>{
  state: IState = {
    list: []
  }

  componentDidMount() {
    var { list } = this.state
    for (var i = 0; i < 40; i++) {
      list.push({key:i,title: '标题' + i, path: "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png" })
    }
    console.log(list);
    this.setState({ list: [...list] })
  }
  goChat(key:number){
    console.log(key);
  }
  render(): React.ReactNode {
    let mapList = this.state.list.map(a => {
      return (
        <AtListItem
          title={a.title}
          arrow='right'
          onClick={()=>{this.goChat(a.key)}}
          thumb={a.path}
        />
      )
    })
    return (
      <view>
        <AtList>
          {mapList}
        </AtList>
      </view>
    )
  }

}
export default Home
