import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { BusinessService } from '../services/business.service';
import { Business } from '../models/business';
import { Location } from '../models/location';
import { Category } from '../models/category';
import { UserService } from '../services/user.service';
import { Subscription } from '../models/subscription';
@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private businessService: BusinessService,
    private usersService: UserService
    ) { }
  businessId:string;
  business: Business;
  location: Location;
  category: Category;
  subscription: Subscription;
  isSubscribed: boolean;
  currentSubscriptionId: string;

  getBusinessById(id: string) {
    this.businessService.getBusinessById(this.businessId).subscribe(
      (business) => {
        this.business = business;
        this.getBusinessLocation(this.business);
        this.getBusinessCategory(this.business);
      },
      (error) => {
        console.log("Couldn't get business, please verify the entered id!\n", error);
      }
    );
  }

  getBusinessLocation(business: Business) {
    this.businessService.getBusinessLocation(business).subscribe(
      (location) => {
        this.location = location;
      },
      (error) => {
        console.log("Couldn't get business location :/\n", error);
      }
    )
  }

  getBusinessCategory(business: Business) {
    this.businessService.getBusinessCategory(business).subscribe(
      (category) => {
        this.category = category;
      },
      (error) => {
        console.log("Couldn't get business category :/\n", error);
      }
    )
  }

  ngOnInit() {
    this.businessId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getBusinessById(this.businessId);
    this.isUserSubscribed();
  }

  prepareSubscription() {
    this.subscription = {
      "businessId": this.businessId,
      "userId": localStorage.getItem('currentUserId'),
      "created": new Date(),
      "type": "normal",
      "view_notify": new Date()
    }
  }

  onSubscribe() {
    this.prepareSubscription();
    this.usersService.createSubscription(this.subscription).subscribe(
      (subscription) => {
        console.log("Subscription created successfully: ", subscription);
        this.isSubscribed = true;
      },
      (error) => {
        console.log("Couldn't create the subscription! ", error);
      }
    );
  }

  onUnsubscribe() {
    this.usersService.deleteSubscription(this.currentSubscriptionId).subscribe(
      (success) => {
        console.log("Subscription deleted!");
        this.isSubscribed = false;
      },
      (error) => {
        console.log("Couldn't delete subscription!");
      }
    );
  }
 
  isUserSubscribed() {
    this.usersService.isSubscribed(localStorage.getItem('currentUserId'),this.businessId).subscribe(
      (subscription) => {
        console.log("You're subscribed to this business, id = ", subscription.id);
        this.isSubscribed = true;
        this.currentSubscriptionId = subscription.id;
      },
      (error) => {
        this.isSubscribed = false;
      }
    );
  }

  onReport(){
    console.log("Reported ",this.businessId);
  }
}
