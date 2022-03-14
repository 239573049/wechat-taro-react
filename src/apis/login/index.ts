import Axios from "../../helper/axios";
class Login{
  WXLogin(code:string,name:string,headPortrait:string){
      return Axios.post(`Login/WXLogin?code=${code}&name=${name}&headPortrait=${headPortrait}`,'')
  }
}
export default new Login
