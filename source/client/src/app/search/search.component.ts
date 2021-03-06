import { LatLng } from "@agm/core";
import { Business } from "./../models/business";
import { BusinessService } from "./../services/business.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MapService } from "src/app/services/map.service";
import { NotificationService } from "src/app/services/notification.service";

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
  openedPopup = false;
  locationFound = false;
  locationLat = null;
  locationLng = null;

  categories = [
    "Retailer",
    "Health Practitioner",
    "Distributor (Finished Goods)",
    "Food Service",
    "Supplier/Raw Ingredient Distributor",
    "Manufacturer",
    "Business Services",
    "Investor",
    "Guest",
    "Mechanical",
    "Select Category"
  ];

  // styling purpouses
  Arr = Array; // Array type captured in a variable
  isLoading: boolean; // toggle loader

  filteredBusinesses: any = { matches: [] };

  constructor(
    private mapService: MapService,
    private businessService: BusinessService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  onSearch() {
    console.log("This criteria was selected ", this.searchForm.value);
    this.isLoading = true;
    // send search patterns
    let coords = { lat: this.locationLat, lng: this.locationLng }; // position coords
    this.businessService.globalSearch(this.searchForm.value, coords).subscribe(
      matches => {
        this.filteredBusinesses = matches;
        console.log(this.filteredBusinesses.matches);
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      },
      err => {
        console.log(err);
      }
    );
  }

  openPopup() {
    this.openedPopup = true;
  }

  closePopup() {
    this.openedPopup = false;
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
    this.closePopup();
  }

  popupClicked() {
    // when user wants to add the location to search query
    this.openPopup();
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
