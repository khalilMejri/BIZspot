import { Component, OnInit, Input } from "@angular/core";
import { BusinessService } from "../services/business.service";
import {  } from "../models/";
import { Business } from "../models/business";
import { Router } from "@angular/router";
import { Review } from 'src/app/models/review';

@Component({
  selector: "app-business",
  templateUrl: "./business.component.html",
  styleUrls: ["./business.component.css"]
})
export class BusinessComponent implements OnInit {
  /*
    Principle : this component is the business card element used in search and feed 
    must pass business to show it 
    TODO // Reviews are optional : getReviews = true to show them 
    Details are optional : getDetails = true to show the link to details 
  */
  @Input() business: Business;
  @Input() getReviews: boolean = false;

  reviews:Review[];
  isReviewsLoaded: boolean = false;
  loadReview:boolean=false;
  btn_value=true;
  constructor(
    private businessService: BusinessService,
    private router: Router
  ) {}

  ngOnInit() {
  }

 

  loadReviews() {
        this.businessService.getBusinessReviews(this.business.id)
      .subscribe(reviews => {
      
        this.reviews = reviews;
     
        this.isReviewsLoaded = true;
      })
  }
  toggleReview(){
        this.loadReview = ! this.loadReview;
    if(this.loadReview){
      
      this.btn_value=false
      if(!this.isReviewsLoaded){
        this.loadReviews();
      }
    }else{
      this.btn_value=true
    }
  }
  checkDetails() {
    this.router.navigate(["/business", this.business.id]);
  }
}
