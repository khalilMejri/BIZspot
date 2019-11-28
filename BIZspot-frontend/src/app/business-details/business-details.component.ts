import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute) { }
  businessId:number;
  ngOnInit() {
    this.businessId = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }
  onSubscribe(){
    console.log("Subscribed ",this.businessId);
  }
  onReport(){
    console.log("Reported ",this.businessId);
  }
}
