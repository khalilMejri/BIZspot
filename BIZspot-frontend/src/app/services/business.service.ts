import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Business } from '../models/business';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  apiUrl="http://localhost:3000/api/businesses"
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
    return this.httpClient.post<Business>(`${this.apiUrl}`,business);
  }
  updateBusiness(id:string,business:Business){
    return this.httpClient.put<Business>(`${this.apiUrl}/${id}`,business);
  }
}
