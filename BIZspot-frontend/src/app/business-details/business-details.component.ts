import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { BusinessService } from '../services/business.service';
import { Business } from '../models/business';
import { Location } from '../models/location';
import { Category } from '../models/category';
@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private businessService: BusinessService
    ) { }
  businessId:string;
  business: Business;
  location: Location;
  category: Category;

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
  }
  onSubscribe(){
    console.log("Subscribed to: ",this.businessId);
  }
  onReport(){
    console.log("Reported ",this.businessId);
  }
}
