export default {
  pages: [
    'pages/my/index',
    'pages/world/index',
    'pages/home/index',
    'pages/group/index',
    'pages/my/edituser/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar:{
    list:[{
      'iconPath':'static/png/home.png',
      'selectedIconPath':'static/png/home1.png',
      pagePath:'pages/home/index',
      text:'首页'
    },{
      'iconPath':'static/png/group.png',
      'selectedIconPath':'static/png/group1.png',
      pagePath:'pages/group/index',
      text:'群聊'
    },{
      'iconPath':'static/png/world.png',
      'selectedIconPath':'static/png/world1.png',
      pagePath:'pages/world/index',
      text:'世界'
    },{
      'iconPath':'static/png/my.png',
      'selectedIconPath':'static/png/my1.png',
      pagePath:'pages/my/index',
      text:'我的'
    }]
  }
}
