import { Injectable } from '@angular/core';
import {uuid} from 'uuid'
interface Notification{
  id?:string
  "text":string,
  "type":string
}
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notifications:Notification[]=[
  ]

  constructor() { }
  addNotification(notif:Notification){
    notif['id'] = uuid()
    console.log("added notif ",notif)
    this.notifications.push(notif);
    setTimeout(() => {
      this.notifications= this.notifications.filter(nf => {return (nf.id !=notif.id)});
    }, 3000);
  }
  getNotifications(){
    return this.notifications;
  }
  resetAll(){
  }
}
