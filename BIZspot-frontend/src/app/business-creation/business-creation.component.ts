import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaiementService } from '../services/paiement.service';

import { ActivatedRoute } from '@angular/router';
import { BusinessService } from '../services/business.service';
import { Location } from '../models/location';
import { Business } from '../models/business';
import { countriesList } from '../models/countries';

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
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    number: new FormControl('', [Validators.required, Validators.pattern(/^\+[1-9]{1}[0-9]{3,14}$/)]),
    locality: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    postal_code: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    openingHour: new FormControl('', Validators.required),
    closingHour: new FormControl('', Validators.required)
  });

  location: Location;
  newBusiness: Business;
  categoryId: string;
  selectedCategory: string;
  selectedCountryName: string;
  selectedCountry;
  countriesList;
  strippedNumber: string;
  constructor(
              private paiementService: PaiementService,
              private router:ActivatedRoute,
              private businessService: BusinessService
              ) { }

  ngOnInit() {

      
    var hasSessionId = this.router.snapshot.queryParamMap.has('session_id');
    console.log('this is a redirection ? ', hasSessionId);
    console.log(this.selectedCategory);
    this.countriesList = countriesList;
  }

  onChangeCategory($event) {
    this.selectedCategory = $event.target.options[$event.target.options.selectedIndex].text;
  }

  // find country by name then update phone and postal code validators
  onChangeCountry($event) {
    this.selectedCountryName = $event.target.options[$event.target.options.selectedIndex].text;
    this.selectedCountry = countriesList.find(
      (country) => {
        if(country.name == this.selectedCountryName) {
          if(country.zip_pattern != "") {
            this.businessCreationForm
              .get('postal_code')
              .setValidators(Validators.pattern(country.zip_pattern));
            console.log("valid? ",this.businessCreationForm.valid);
          }
          else {
            this.businessCreationForm
              .get('postal_code')
              .setValidators(Validators.pattern(/^$/));
          }
          this.businessCreationForm.get('postal_code').markAsTouched();
          // activating the change in validators
          this.businessCreationForm.updateValueAndValidity();
          
          return country;
        }
      }
    );
  }

  findInvalidControls() {
    const invalid = [];
    const controls = this.businessCreationForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  storeLocation() {
    this.location = {
      "country": this.businessCreationForm.value.country,
      "locality": this.businessCreationForm.value.locality,
      "postal_code": this.businessCreationForm.value.postal_code,
      "state": this.businessCreationForm.value.state
    };
  }


  storeBusiness(locationId: string) {
    this.newBusiness = {
      "locationId": locationId,
      "email": this.businessCreationForm.value.email,
      "members": [{ "id": localStorage.getItem('currentUserId') }],
      "number": this.businessCreationForm.value.number,
      "openingHours": [{ "openingHour": this.businessCreationForm.value.openingHour }, { "closingHour": this.businessCreationForm.value.closingHour }],
      "title": this.businessCreationForm.value.title,
      "status": "Unverified",
      "categoryId": this.categoryId,
      "level": 0,
      "about": this.businessCreationForm.value.description
    };
  }

  createBusiness() {
    this.businessService.createBusiness(this.newBusiness).subscribe(
      (business) => {
        console.log("Business Created: \n", business);
      },
      (error) => {
        console.log("Couldn't create business: ", error);
      }
    );
  }

  createLocationThenBusiness() {
    this.businessService.createBusinessLocation(this.location).subscribe(
      (location) => {
        console.log("location id: ", location.id);
        // location created, we need to get category id and new location id then store all biz data to our variable

        // get chosen category id first
        this.businessService.findCategory(this.selectedCategory).subscribe(
          (category) => {
            this.categoryId = category.id;
            console.log("category id: ", this.categoryId);
            // now category id is set up, we send location id ;)
            this.storeBusiness(location.id);
            console.log(this.newBusiness);
            // now create the biz finally
            this.createBusiness();
          },
          (error) => {
            console.log("error, couldn't get category id: ", error);
          }
        );
      },
      (error) => {
        console.log("couldn't create location : ", error);
      }
    );
  }

  onSubmit(planName: string) {
    // stripping all characters except '+' and digits from our phone number
    this.strippedNumber = this.businessCreationForm.get('number').value;
    this.strippedNumber = this.strippedNumber.replace(/[^\d+]/g, '');
    this.businessCreationForm.get('number').setValue(this.strippedNumber);

    // now we can verify if our form is valid or not
    if(this.businessCreationForm.valid)
    {
      // store location which is our new biz' location
      this.storeLocation();
      // now create the new location then create the new biz
      this.createLocationThenBusiness();
    }
    // form invalid, we display the invalid controls
    else {
      console.log("Invalid Form!! \n", this.findInvalidControls());
    }
  }
}
