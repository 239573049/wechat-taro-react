import Axios from "../../helper/axios";
class Login extends Axios{
  WXLogin(code:string,name:string,headPortrait:string){
      return this.post(`Login/WXLogin?code=${code}&name=${name}&headPortrait=${headPortrait}`,'')
  }
  /**
   * 刷新token
   * @returns
   */
  GetToken(){
    return this.get('Login/GetToken')
  }
}
export default new Login
