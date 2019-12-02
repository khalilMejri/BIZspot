import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PaiementService } from '../services/paiement.service';

import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
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
    name: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    number: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
  })
  constructor(private paiementService: PaiementService,private router:ActivatedRoute) { }

  ngOnInit() {

      
    var hasSessionId = this.router.snapshot.queryParamMap.has('session_id');
    console.log('this is a redirection ? ', hasSessionId);
  }
  onSubmit(planName: string) {
    var stripe = Stripe(this.publicKey);
    var planId;
    switch (planName) {
      case 'silver':
        planId = this.planIdsKeys.silverPlan
        break;
      case 'gold':
        planId = this.planIdsKeys.goldPlan
        break;
      case 'platinum':
        planId = this.planIdsKeys.platinumPlan
        break;
    }
    console.log('user choice is ', planName);
    const id = localStorage.getItem('currentUserId');
    // here must load the paiement
    console.log("current user id ", id)
    console.log("Creating a business ", this.businessCreationForm.value);
    this.paiementService.createPaiementSession(planId)
      .subscribe(sessionId => {
        stripe.redirectToCheckout({
          sessionId
        }).then((result) => {
          // handling error of redirecting
          console.log('problem in redirecting to the checkout page');
          console.log(result)
        });
      })
  }
}
