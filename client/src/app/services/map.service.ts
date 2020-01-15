import { Injectable } from "@angular/core";
import { Location } from "../models/location";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class MapService {
  location: Location;
  token = "7aeaca53bde648";
  geoUrl = "https://eu1.locationiq.com/v1/search.php";
  reverseUrl = "https://eu1.locationiq.com/v1/reverse.php";

  constructor(private http: HttpClient) {}

  geoCode(locationData) {
    // get a street, number , city, country -> return  coords
    var params = new HttpParams({
      fromObject: {
        key: this.token,
        q: `${locationData.number} ${locationData.street} ${locationData.city},${locationData.country}`,
        format: "json"
      }
    });

    return this.http.get(this.geoUrl, { params: params });
  }
  reverseGeoCode(coords) {
    // get coord -> return location data
    var params = new HttpParams({
      fromObject: {
        key: this.token,
        lat: coords.lat,
        lon: coords.lng,
        format: "json"
      }
    });
    return this.http.get(this.reverseUrl, { params: params });
  }
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
