import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { BusinessService } from '../services/business.service';
import { Business } from '../models/business';
import { Location } from '../models/location';
import { Category } from '../models/category';
import { UserService } from '../services/user.service';
import { Subscription } from '../models/subscription';
import { FormGroup,FormControl } from '@angular/forms';
import { Review } from '../models/review';
import { ReviewService } from '../services/review.service';
@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private businessService: BusinessService,
    private usersService: UserService,
    private reviewService: ReviewService
    ) { }
  businessId:string;
  business: Business;
  location: Location;
  category: Category;
  subscription: Subscription;
  isSubscribed: boolean;
  currentSubscriptionId: string;
  reviews: Review[] = null;
  newReview: Review;
  reviewForm= new FormGroup({
    "review": new FormControl('')
  });

  getBusinessById(id: string) {
    this.businessService.getBusinessById(this.businessId).subscribe(
      (business) => {
        this.business = business;
        this.getBusinessLocation(this.business);
        this.getBusinessCategory(this.business);
        this.getBusinessReviews(id);
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

  getBusinessReviews(businessId: string) {
    this.businessService.getBusinessReviews(businessId).subscribe(
      (reviews) => {
        this.reviews = reviews;
        console.log(this.reviews);
      },
      (error) => {
        console.log("Couldn't get business reviews! \n", error);
      }
    );
  }

  ngOnInit() {
    this.businessId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getBusinessById(this.businessId);
    this.isUserSubscribed();
    //this.getBusinessReviews(this.businessId);
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

  onReport() {
    console.log("Reported ",this.businessId);
  }

  prepareReview() {
    this.newReview = {
      "userId": localStorage.getItem('currentUserId'),
      "businessId": this.businessId,
      "content": this.reviewForm.get('review').value,
      "lastEdited": new Date(),
      "postedAt": new Date(),
      "rating": 3
    }
  }
  
  onReviewSubmit() {
    this.prepareReview();
    this.reviewService.createReview(this.newReview).subscribe(
      (review) => {
        console.log("Review created successfully! :]\n", review);
        // shows the inserted review dynamically :]
        //this.getBusinessReviews(this.businessId); 
        this.reviews.push(review); // this one is faster, no need to load all the previous reviews
        this.reviewForm.get('review').setValue(''); // make review input empty
      },  
      (error) => {
        console.log("Couldn't create review!\n", error);
      }
    );
  }
}
