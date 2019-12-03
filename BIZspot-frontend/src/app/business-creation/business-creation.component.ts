import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PaiementService } from '../services/paiement.service';

import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from '../services/business.service';
import { Location } from '../models/location';
import { Business } from '../models/business';
declare var Stripe;
@Component({
  selector: 'app-business-creation',
  templateUrl: './business-creation.component.html',
  styleUrls: ['./business-creation.component.css']
})
export class BusinessCreationComponent implements OnInit {
  planIdsKeys = {
    silverPlan: "plan_GHXGivpxPm68x1",
    goldPlan: "plan_GHXHK4Zy22LdzS",
    platinumPlan: "plan_GHXIx3fTn2S8FQ",
  };
  publicKey = "pk_test_SwjnCGmvTyeon0cnSCyguKaX00yCDpMTBP";

  businessCreationForm = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    number: new FormControl(''),
    locality: new FormControl(''),
    country: new FormControl(''),
    postal_code: new FormControl(''),
    state: new FormControl(''),
    email: new FormControl(''),
    openingHour: new FormControl(''),
    closingHour: new FormControl('')
  });

  location: Location;
  newBusiness: Business;
  categoryId: string;
  selectedCategory: string;
  constructor(
              private paiementService: PaiementService,
              private router:ActivatedRoute,
              private businessService: BusinessService
              ) { }

  ngOnInit() {

      
    var hasSessionId = this.router.snapshot.queryParamMap.has('session_id');
    console.log('this is a redirection ? ', hasSessionId);
    console.log(this.selectedCategory);
  }

  onChangeCategory($event) {
    this.selectedCategory = $event.target.options[$event.target.options.selectedIndex].text;
  }

  onSubmit(planName: string) {
    this.location = {
      "country": this.businessCreationForm.value.country,
      "locality": this.businessCreationForm.value.locality,
      "postal_code": this.businessCreationForm.value.postal_code,
      "state": this.businessCreationForm.value.state 
    };

    // get chosen category id first
    this.businessService.findCategory(this.selectedCategory).subscribe(
      (category) => {
        this.categoryId = category.id;
        console.log("category id: ", this.categoryId);
      },
      (error) => {
        console.log("error, couldn't get category id: ", error);
      }
    );
    this.businessService.createBusinessLocation(this.location).subscribe(
      (location) => {
        console.log("location id: ", location.id);
        // location created, we need to retrieve its id
        this.newBusiness = {
          "locationId": location.id,
          "email": this.businessCreationForm.value.email,
          "members": [{"id": localStorage.getItem('currentUserId')}],
          "number": this.businessCreationForm.value.number,
          "openingHours": [{ "openingHour": this.businessCreationForm.value.openingHour},{ "closingHour": this.businessCreationForm.value.closingHour}],
          "title": this.businessCreationForm.value.title,
          "status": "Unverified",
          "categoryId": this.categoryId,
          "level": 0
        };
        console.log(this.newBusiness);
        this.businessService.createBusiness(this.newBusiness).subscribe(
          (business) => {
            console.log("Business Created: \n", business);
          },
          (error) => {
            console.log("Couldn't create business: ", error);
          }
        )
      },
      (error) => {
        console.log("couldn't create location : ", error);
      }
    );
  }
}
