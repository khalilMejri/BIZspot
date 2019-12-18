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

  businesses: Business[]=[];
  topBusiness: Business = null;
  topReviewer: User = null;
  limit=2;
  skip=0;
  constructor(
    private businessService: BusinessService,
    private userService: UserService
  ) { }

  getBusinesses(limit,skip) {
    this.businessService.getLimitedBusinesses(limit,skip).subscribe(
      (businesses) => {
        console.log("requested business",businesses)
        this.businesses.push(...businesses) ;
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
    //this.getBusinesses(this.limit,this.skip);
    console.log("using ",this.limit,this.skip)
    this.getTopBusiness();
    this.getTopReviewer();
  }
  onScroll(){
    console.log("user scrolled");
    this.getBusinesses(this.limit,this.skip);
    this.skip += this.limit
  }

}
