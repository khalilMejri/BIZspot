import { Component, OnInit, Input } from '@angular/core';
import { Business } from '../models/business';
import { Location } from '../models/location';
import { BusinessService } from '../services/business.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  @Input() business: Business;
  @Input() subscriptionId: string;
  location: Location;
  
  constructor(
    private businessService: BusinessService,
    private router: Router,
    private userService: UserService
  ) { }

  getBusinessLocation() {
    this.businessService.getBusinessLocation(this.business).subscribe(
      (location) => {
        this.location = location;
      },
      (error) => {
        console.log("Couldn't get location!\n", error);
      }
    );
  }
  
  ngOnInit() {
    this.getBusinessLocation();
  }

  onDetails() {
    const link = [`business/${this.business.id}`];
    this.router.navigate(link);
  }

  onUnsubscribe() {
    this.userService.deleteSubscription(this.subscriptionId).subscribe(
      (success) => {
        console.log("Subscription deleted!");
        this.location = null; // to make business disappear in UI
      },
      (error) => {
        console.log("Couldn't delete subscription!");
      }
    );
  }

}
