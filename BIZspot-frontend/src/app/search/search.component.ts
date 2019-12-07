import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm = new FormGroup({
    term: new FormControl(''),
    category: new FormControl(''),
    stars: new FormControl(''),
    reviews: new FormControl(''),
  })
  locationForm = new FormGroup({
    number: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
  })
  constructor() { }

  ngOnInit() {
  }
  onSearch(){
    console.log("This criteria was selected ",this.searchForm.value);
  }
  onLocationSubmit(){
    console.log(this.locationForm.value);
  }
}
