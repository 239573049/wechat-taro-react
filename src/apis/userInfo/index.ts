import Axios from "../../helper/axios";
import UserInfoDto from "../../models/user/userInfoDto";
class UserInfoApi extends Axios{
  /**
   * 获取用户信息
   * @returns
   */
  GetUserInfo(){
    return this.get("UserInfo/GetUserInfo")
  }
  /**
   * 编辑用户
   * @param userInfo 用户信息
   * @returns
   */
  UpdateUserInfo(userInfo:UserInfoDto){
    return this.put("UserInfo/UpdateUserInfo",userInfo)
  }
}
export default new UserInfoApi
