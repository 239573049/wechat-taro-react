import Axios from "../../../helper/axios";
import ApplicationRecord from '../../../models/groups/applicationRecordDto'
class ApplicationRecordApi extends Axios{
  /**
   * 添加好友申请
   */
  AddFriend(applicationRecord:ApplicationRecord){
    return this.post("ApplicationRecord/AddFriend",applicationRecord)
  }
  /**
    同意|拒绝好友申请
   * @param id
   * @param isRefuse
   * @returns
   */
  ApplyForDealWith(id:string,isRefuse:boolean){
    return this.get(`ApplicationRecord/ApplyForDealWith?id=${id}&isRefuse=${isRefuse}`)
  }
  /**
   * 用户申请记录分页
   * @param pageNo
   * @param pageSize
   * @returns
   */
  GetApplicationRecordPage(pageNo:number,pageSize:number){
    return this.get(`ApplicationRecord/GetApplicationRecordPage?pageNo=${pageNo}&pageSize=${pageSize}`)
  }
}
export default new ApplicationRecordApi
