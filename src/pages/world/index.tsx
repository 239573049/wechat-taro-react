import React from "react";
interface IState{

}
interface IProps{

}
class World extends React.Component<IProps,IState>{
  state:IState={

  }
  render(): React.ReactNode {
    return(
      <view>
        世界
      </view>
    )
  }

}
export default World
