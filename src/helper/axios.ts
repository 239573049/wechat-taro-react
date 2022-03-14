import request from "./request";
class Axios{
  get(url:string){
   return new Promise((resolve, reject) => {
     request({url,method:"GET"})
      .then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
   })
  }
  post(url:string,data:any){
    return new Promise((resolve, reject) => {
      request({url,method:"POST",data})
       .then(res=>{
         console.log('测试',res);
         resolve(res)
       }).catch(err=>{
         reject(err)
       })
    })
  }
  put(url:string,data:any){
   return new Promise((resolve, reject) => {
     request({url,method:"PUT"})
      .then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
   })
  }
  delete(url:string){
   return new Promise((resolve, reject) => {
     request({url,method:"DELETE"})
      .then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
   })
  }
}
export default  Axios
