import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Business } from "../models/business";
import { Review } from "../models/review";
import { Location } from "../models/location";
import { Category } from "../models/category";

@Injectable({
  providedIn: "root"
})
export class BusinessService {
  apiUrl = "http://localhost:3000/api/businesses";
  baseUrl = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) {}

  getBusinesses() {
    return this.httpClient.get<Business[]>(this.apiUrl);
  }

  getBusinessById(id: string) {
    return this.httpClient.get<Business>(`${this.apiUrl}/${id}`);
  }

  getBusinessByOwnerId(id :string){
    return this.httpClient.get<Business>(`${this.baseUrl}/users/${id}/businesses`);
  }

  getBusinessReviews(id: string) {
    return this.httpClient.get<Review[]>(`${this.apiUrl}/${id}/reviews`);
  }

  createBusiness(business: Business) {
    return this.httpClient.post<Business>(`${this.apiUrl}`, business);
  }
  createUserBusiness(business: Business, id:string){
    return this.httpClient.post<Business>(`${this.baseUrl}/users/${id}/businesses`,business);
  }
  updateBusiness(id: string, business: Business) {
    return this.httpClient.put<Business>(`${this.apiUrl}/${id}`, business);
  }

  getBusinessLocation(business: Business) {
    return this.httpClient.get<Location>(
      `${this.baseUrl}/locations/${business.locationId}`
    );
  }

  createBusinessLocation(location: Location) {
    return this.httpClient.post<Location>(
      `${this.baseUrl}/locations`,
      location
    );
  }

  findCategory(name: string) {
    return this.httpClient.get<Category>(
      `${this.baseUrl}/categories/findOne?filter[where][name]=${name}`
    );
  }

  getBusinessCategory(business: Business) {
    return this.httpClient.get<Category>(
      `${this.baseUrl}/categories/${business.categoryId}`
    );
  }

  findTopBusiness() {
    return this.httpClient.get<Business>(
      `${this.apiUrl}?filter[order]=level DESC&filter[limit]=1`
    );
  }

  searchByKeywords(keywords: string) {
    return this.httpClient.get<any>(
      `${this.apiUrl}/fetchByKeywords/?keywords=${keywords}`
    );
  }

  getLatestReviews(businessId: string, limit: number) {
    return this.httpClient.get<Review>(`${this.apiUrl}/${businessId}/reviews?filter[order]=postedAt DESC&filter[limit]=${limit}`);
  }

  getTopBusiness() {
    return this.httpClient.get<Business>(`${this.apiUrl}?filter[order]=level DESC&filter[limit]=1`);
  }
}
