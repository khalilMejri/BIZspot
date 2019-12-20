import { Component, OnInit, Input } from '@angular/core';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  
  @Input() reviews: Review[];
  
  constructor() { }

  ngOnInit() {
    console.log("Reviews : \n", this.reviews);
  }

}
