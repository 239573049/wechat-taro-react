import { Component } from 'react'
import './app.less'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
class App extends Component {

  constructor(props:any){
    super(props)
    props.data="cs";
  }
  componentDidMount () {

  }

  componentDidShow () {

  }

  componentDidHide () {}

  componentDidCatchError () {}

  render () {
    return this.props.children
  }
}

export default App
