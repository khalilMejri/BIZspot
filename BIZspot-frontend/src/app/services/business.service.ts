import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Business } from '../models/business';
import { Review } from '../models/review';
import { Location } from '../models/location';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  apiUrl="http://localhost:3000/api/businesses";
  api = "http://localhost:3000/api";
  constructor(private httpClient:HttpClient) { }

  getBusinesses(){
    return this.httpClient.get<Business[]>(this.apiUrl);
  }
  getBusinessById(id:string){
    return this.httpClient.get<Business>(`${this.apiUrl}/${id}`);
  }
  getBusinessReviews(id:string){
    return this.httpClient.get<Review[]>(`${this.apiUrl}/${id}/reviews`);
  }
  createBusiness(business:Business){
    return this.httpClient.post<Business>(`${this.apiUrl}`, business);
  }
  updateBusiness(id:string,business:Business){
    return this.httpClient.put<Business>(`${this.apiUrl}/${id}`,business);
  }

  getBusinessLocation(business: Business) {
    return this.httpClient.get<Location>(`${this.api}/locations/${business.locationId}`);
  }

  createBusinessLocation(location: Location) {
    return this.httpClient.post<Location>(`${this.api}/locations`, location);
  }

  findCategory(name: string) {
    return this.httpClient.get<Category>(`${this.api}/categories/findOne?filter[where][name]=${name}`);
  }
}
