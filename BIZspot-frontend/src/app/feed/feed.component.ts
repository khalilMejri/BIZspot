import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../services/business.service';
import { Business } from '../models/business';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  businesses: Business[];
  
  constructor(
    private businessService: BusinessService
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

  }

  getTopReviewer() {
    
  }
  
  ngOnInit() {
    this.getBusinesses();
  }

}
