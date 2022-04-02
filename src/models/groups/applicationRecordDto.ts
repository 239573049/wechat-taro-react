import UserInfoDto from "../user/userInfoDto";

class ApplicationRecordDto{
  id:string|undefined;
  applicantId:string|undefined;
  beAppliedId:string|undefined;
  remark:string|undefined;
  friendStatue:number|undefined;
  addInformation:UserInfoDto
}
export default ApplicationRecordDto;
