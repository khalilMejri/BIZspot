import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { MapService } from 'src/app/services/map.service';

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
  locationFound=false
  locationLat=null
  locationLng=null
  constructor(private mapService:MapService) { }

  ngOnInit() {
    this.mapService.getPosition()
      .then(res => {
         this.locationLat = res.lat;
         this.locationLng = res.lng;
      })
      .catch(err=> console.log(err))
  }
  onSearch(){
    console.log("This criteria was selected ",this.searchForm.value);
  }
  onLocationSubmit(){
    console.log(this.locationForm.value);
    this.mapService.geoCode(this.locationForm.value)

  }
  mapLocationChanged(data){
    console.log("choosed location",data.coords)
    this.locationFound = true
    this.locationLat = data.coords.lat;
    this.locationLng = data.coords.lng;
    this.mapService.reverseGeoCode(data.coords)
  }
}
