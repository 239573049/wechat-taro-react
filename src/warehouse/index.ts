import { HubConnection } from '../helper/signalr'
class Warehouse {
  private chatHub: HubConnection
  constructor(){
    this.chatHub=new HubConnection()
  }
  getHubConnection() {
    return this.chatHub
  }

}
export default new Warehouse()
