import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl} from '@angular/forms';
@Component({
  selector: 'app-business-creation',
  templateUrl: './business-creation.component.html',
  styleUrls: ['./business-creation.component.css']
})
export class BusinessCreationComponent implements OnInit {
  businessCreationForm = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    number: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
  })
  constructor() { }

  ngOnInit() {
  }
  onSubmit(){
    console.log("Creating a business ",this.businessCreationForm.value);
  }
}
