import { Component, OnInit,Input } from '@angular/core';
import { Review } from 'src/app/models/review';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  
  @Input() review: Review;

  author: User;
  currentUserId: string;
  isAllowedToDelete: boolean;
  deleted = false;

  constructor(
    private userService: UserService,
    private reviewService: ReviewService
  ) { }

  getReviewAuthor() {
    this.userService.getUserById(this.review.userId).subscribe(
      (user) => {
        this.author = user;
        this.isAllowedToDelete = this.author.id == this.currentUserId;
      },
      (error) => {
        console.log("Couldn't get the author of this review! \n", error);
      }
    );
  }
  
  ngOnInit() {
    this.currentUserId = localStorage.getItem("currentUserId");
    this.getReviewAuthor();
  }

  deleteReview() {
    this.reviewService.deleteReview(this.review.id).subscribe(
      (success) => {
        console.log("Review deleted successfully!");
        this.deleted = true; // hide the deleted review
      },
      (error) => {
        console.log("Couldn't delete review! \n", error);
      }
    );
  }

}
