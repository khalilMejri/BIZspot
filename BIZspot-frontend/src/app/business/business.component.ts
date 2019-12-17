import { Component, OnInit, Input } from "@angular/core";
import { BusinessService } from "../services/business.service";
import { Review } from "../models/review";
import { Business } from "../models/business";
import { Router } from "@angular/router";

@Component({
  selector: "app-business",
  templateUrl: "./business.component.html",
  styleUrls: ["./business.component.css"]
})
export class BusinessComponent implements OnInit {
  /*
    Principle : this component is the business card element used in search and feed 
    must pass business to show it 
    Reviews are optional : getReviews = true to show them 
    Details are optional : getDetails = true to show the link to details 
  */
  @Input() business: Business;
  @Input() getReviews: boolean = false;
  @Input() showDetails: boolean = true;
  isReviewsLoaded: boolean = false;
  reviews: Review[];

  constructor(
    private businessService: BusinessService,
    private router: Router
  ) {}

  ngOnInit() {}

  goToDetails() {
    const link = [`business/${this.business.id}`];
    this.router.navigate(link);
  }

  loadReviews() {
    console.log("loading reviews");
    /*this.businessService.getBusinessReviews(business.id)
      .subscribe(reviews => {
        this.reviews = reviews;
        this.isReviewsLoaded = true;
      })*/
  }
  checkDetails() {
    this.router.navigate(["/business", this.business.id]);
  }
}
