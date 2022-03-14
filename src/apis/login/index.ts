import Axios from "../../helper/axios";
class Login extends Axios{
  WXLogin(code:string,name:string,headPortrait:string){
      return this.post(`Login/WXLogin?code=${code}&name=${name}&headPortrait=${headPortrait}`,'')
  }
}
export default new Login
