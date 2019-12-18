import { Business } from "./../models/business";
import { BusinessService } from "./../services/business.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MapService } from "src/app/services/map.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  searchForm = new FormGroup({
    term: new FormControl(""),
    category: new FormControl(""),
    stars: new FormControl(""),
    reviews: new FormControl("")
  });

  locationForm = new FormGroup({
    number: new FormControl("", Validators.required),
    street: new FormControl(""),
    city: new FormControl("", Validators.required),
    country: new FormControl("")
  });

  locationFound = false;
  locationLat = null;
  locationLng = null;

  // styling purpouses
  Arr = Array; // Array type captured in a variable

  filteredBusinesses: any = { matches: [] };

  constructor(
    private mapService: MapService,
    private businessService: BusinessService
  ) {}

  ngOnInit() {}

  onSearch() {
    console.log("This criteria was selected ", this.searchForm.value);
    // step 1 : filter with keywords
    this.businessService
      .searchByKeywords(this.searchForm.value.term || "")
      .subscribe(
        filteredBiz => {
          // TODO: update search results view
          this.filteredBusinesses = filteredBiz;
          console.log(this.filteredBusinesses.matches);
        },
        err => {
          console.log(err);
        }
      );
  }

  getRows() {
    let base = Math.round(this.filteredBusinesses.matches.length / 3);
    let rest = this.filteredBusinesses.matches.length % 3 ? 1 : 0;
    return base + rest;
  }

  onLocationSubmit() {
    // Called when using location form
    console.log(this.locationForm.value);
    if (this.locationForm.invalid || this.locationForm.pristine) {
      console.log("There is selected location");
      // TODO : some notification ui
    } else
      this.mapService.geoCode(this.locationForm.value).subscribe(result => {
        console.log(result[0]);
        this.locationLat = Number.parseFloat(result[0]["lat"]);
        this.locationLng = Number.parseFloat(result[0]["lon"]);
      });
  }

  mapLocationChanged(data) {
    // Called when user change location on map
    console.log("choosed location", data.coords);
    this.locationFound = true;
    console.log("map location changed , ", data.coords);
    this.locationLat = data.coords.lat;
    this.locationLng = data.coords.lng;
    this.mapService.reverseGeoCode(data.coords).subscribe(result => {
      console.log(result["address"]);
      this.locationForm.setValue({
        number: result["address"]["postcode"] || "",
        street: result["address"]["road"] || result["address"]["county"] || "",
        city: result["address"]["city"] || result["address"]["state"] || "",
        country: result["address"]["country"] || ""
      });
    });
  }

  locationAccepted() {
    // Called when user accept location and get back to search component(closing popup)
    console.log("Accepted location coords", this.locationLat, this.locationLng);
    console.log("Accepted location address", this.locationForm.value);
  }

  popupClicked() {
    // when user wants to add the location to search query
    this.mapService
      .getPosition()
      .then(res => {
        this.locationLat = res.lat;
        this.locationLng = res.lng;
        console.log("res ", res);
      })
      .catch(err => console.log(err));
  }
}
