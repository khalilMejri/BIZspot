import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { BusinessService } from '../services/business.service';
import { Business } from '../models/business';

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscriptions-list.component.html',
  styleUrls: ['./subscriptions-list.component.css']
})
export class SubscriptionsListComponent implements OnInit {

  currentUserId: string;
  subscribedBusinessesIds: string[] = [];
  subscribedBusinesses: Business[] = [];
  subscriptionsIds: string[] = [];
  
  constructor(
    private userService: UserService,
    private businessService: BusinessService
  ) { }

  getBusinessesandSubsIds() {
    this.userService.getSubscriptions(this.currentUserId).subscribe(
      (subscriptions) => {
        for (let subscription of subscriptions) {
          this.subscribedBusinessesIds.push(subscription.businessId);
          this.subscriptionsIds.push(subscription.id);
        }
        this.loadBusinesses();
       },
      (error) => {
        console.log("Couldn't get subscriptions!\n", error);
      }
    );
  }

  getBusiness(id: string) {
    this.businessService.getBusinessById(id).subscribe(
      (business) => {
        this.subscribedBusinesses.push(business);
      },
      (error) => {
        console.log("Couldn't get business!\n", error);
      }
    );
  }
  
  loadBusinesses() {
    for (let id of this.subscribedBusinessesIds) {
      this.getBusiness(id);
    }
  }

  ngOnInit() {
    this.currentUserId = localStorage.getItem("currentUserId");
    this.getBusinessesandSubsIds();
    //this.loadBusinesses();
  }

}
