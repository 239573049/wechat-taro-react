import UserInfoDto from "../user/userInfoDto";

class ApplicationRecordDto{
  applicantId:string|undefined;
  beAppliedId:string|undefined;
  remark:string|undefined;
  friendStatue:number|undefined;
  addInformation:UserInfoDto
}
export default ApplicationRecordDto;
