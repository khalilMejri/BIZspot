import { Injectable } from '@angular/core';
import { Location } from '../models/location';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  location: Location;
  token = "7aeaca53bde648"
  geoUrl = "https://eu1.locationiq.com/v1/search.php"
  reverseUrl="https://eu1.locationiq.com/v1/reverse.php"
  headers:HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
    this.headers = this.headers.append("Access-Control-Allow-Headers", "*")
    this.headers = this.headers.append("Access-Control-Allow-Methods", "GET")
    this.headers = this.headers.append("Access-Control-Allow-Origin", "*")
   }

  geoCode(locationData) {
    // get a streetnumber , city, country -> return  coords
    var params = new HttpParams({
      fromObject: {
        'key': this.token,
        'q': `${locationData.number} ${locationData.street} ${locationData.city},${locationData.country}`,
        'format': 'json'
      }
    })
    console.log("headers ", this.headers.keys())
    console.log("params ", params.keys())
    
    this.http.get(this.geoUrl, { headers:this.headers,params:params })
      .subscribe(res => {
        console.log(res)
      })
  }
  reverseGeoCode(coords) {
    // get coord -> return location data
    var params = new HttpParams({
      fromObject: {
        'key': this.token,
        'lat': coords.lat,
        'lon': coords.lng,
        'format': 'json'
      }
    })
    this.http.get(this.reverseUrl, { headers:this.headers,params:params })
      .subscribe(res => {
        console.log(res)
      })
  }
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });

  }
  findLocation(address: string) {

  }
}
