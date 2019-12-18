import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../services/business.service';
import { Business } from '../models/business';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  businesses: Business[];
  topBusiness: Business = null;
  topReviewer: User = null;
  
  constructor(
    private businessService: BusinessService,
    private userService: UserService
  ) { }

  getBusinesses() {
    this.businessService.getBusinesses().subscribe(
      (businesses) => {
        this.businesses = businesses;
      },
      (error) => {
        console.log("Couldn't get businesses! \n", error);
      }
    );
  }

  getTopBusiness() {
    this.businessService.findTopBusiness().subscribe(
      (topBusiness) => {
        this.topBusiness = topBusiness;
      },
      (error) => {
        console.log("Couldn't get top business! \n", error);
      }
    );
  }

  getTopReviewer() {
    this.userService.findTopReviewers(1).subscribe(
      (topReviewer) => {
        this.topReviewer = topReviewer[0];
        console.log("Top Reviewer : ", this.topReviewer);
      },
      (error) => {
        console.log("Couldn't get top reviewer! \n", error);
      }
    );
  }
  
  ngOnInit() {
    this.getBusinesses();
    this.getTopBusiness();
    this.getTopReviewer();
  }

}
