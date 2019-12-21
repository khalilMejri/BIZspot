import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Review } from '../models/review';
import { Business } from '../models/business';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  topReviewers: User[] = [];
  topBusiness: Business;
  latestReview: Review;
  author: User;
  
  constructor(
    private userService: UserService,
    private router: Router,
    private businessService: BusinessService
  ) { }

  ngOnInit() {
    this.getTopReviewers();
    this.getTopBusiness();
  }

  isLogged() {
    return this.userService.isLogged();
  }

  logout() {
    this.userService.logout();
  }

  getTopReviewers() {
    this.userService.findTopReviewers(3).subscribe(
      (topReviewers) => {
        this.topReviewers = topReviewers;
        console.log("Top Reviewers: \n", this.topReviewers);
      },
      (error) => {
        console.log("Couldn't get top reviewers! \n");
      }
    );
  }

  getTopBusiness() {
    this.businessService.getTopBusiness().subscribe(
      (topBusiness) => {
        this.topBusiness = topBusiness[0];
        console.log("Top Business : ", this.topBusiness);
        this.getLatestReview(this.topBusiness.id);
      },
      (error) => {
        console.log("Couldn't get top business! \n");
      }
    );
  }

  getLatestReview(businessId: string) {
    this.businessService.getLatestReviews(businessId, 1).subscribe(
      (latestReview) => {
        this.latestReview = latestReview[0];
        console.log("Latest Review: ", this.latestReview);
        this.getReviewAuthor();
      },
      (error) => {
        console.log("Couldn't get the last review! \n"); 
      }
    );
  }

  getReviewAuthor() {
    this.userService.getUserById(this.latestReview.userId).subscribe(
      (author) => {
        this.author = author;
      },
      (error) => {
        console.log("Couldn't get author! \n", error);
      }
    );
  }

}
