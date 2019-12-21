import { EnvService } from "./../env.service";
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
  // apiUrl = "http://localhost:3000/api/businesses";
  // baseUrl = "http://localhost:3000/api";

  route: string = "/businesses";

  constructor(private httpClient: HttpClient, private envService: EnvService) {}

  getBusinesses() {
    return this.httpClient.get<Business[]>(this.envService.apiUrl + this.route);
  }
  getLimitedBusinesses(limit: number = 10, skip: number = 0) {
    console.log("limit ", limit, "skip ", skip);
    return this.httpClient.get<Business[]>(
      `${this.envService.apiUrl +
        this.route}?filter[limit]=${limit}&filter[offset]=${skip}`
    );
  }
  getBusinessById(id: string) {
    return this.httpClient.get<Business>(
      `${this.envService.apiUrl + this.route}/${id}`
    );
  }

  getBusinessByOwnerId(id: string) {
    return this.httpClient.get<Business>(
      `${this.envService.apiUrl}/users/${id}/businesses`
    );
  }

  getBusinessReviews(id: string) {
    return this.httpClient.get<Review[]>(
      `${this.envService.apiUrl + this.route}/${id}/reviews`
    );
  }

  createBusiness(business: Business) {
    return this.httpClient.post<Business>(
      `${this.envService.apiUrl + this.route}`,
      business
    );
  }
  createUserBusiness(business: Business, id: string) {
    return this.httpClient.post<Business>(
      `${this.envService.apiUrl}/users/${id}/businesses`,
      business
    );
  }
  updateBusiness(id: string, business: Business) {
    return this.httpClient.put<Business>(
      `${this.envService.apiUrl + this.route}/${id}`,
      business
    );
  }

  getBusinessLocation(business: Business) {
    return this.httpClient.get<Location>(
      `${this.envService.apiUrl}/locations/${business.locationId}`
    );
  }

  createBusinessLocation(location: Location) {
    return this.httpClient.post<Location>(
      `${this.envService.apiUrl}/locations`,
      location
    );
  }

  findCategory(name: string) {
    return this.httpClient.get<Category>(
      `${this.envService.apiUrl}/categories/findOne?filter[where][name]=${name}`
    );
  }

  getBusinessCategory(business: Business) {
    return this.httpClient.get<Category>(
      `${this.envService.apiUrl}/categories/${business.categoryId}`
    );
  }

  findTopBusiness() {
    return this.httpClient.get<Business>(
      `${this.envService.apiUrl +
        this.route}?filter[order]=level DESC&filter[limit]=1`
    );
  }

  searchByKeywords(keywords: string) {
    return this.httpClient.get<any>(
      `${this.envService.apiUrl +
        this.route}/fetchByKeywords/?keywords=${keywords}`
    );
  }

  getLatestReviews(businessId: string, limit: number) {
    return this.httpClient.get<Review>(
      `${this.envService.apiUrl +
        this
          .route}/${businessId}/reviews?filter[order]=postedAt DESC&filter[limit]=${limit}`
    );
  }

  getTopBusiness() {
    return this.httpClient.get<Business>(
      `${this.envService.apiUrl +
        this.route}?filter[order]=level DESC&filter[limit]=1`
    );
  }

  globalSearch(patterns: any, coords: any) {
    return this.httpClient.post<any>(
      `${this.envService.apiUrl + this.route}/globalSearch`,
      {
        patterns: patterns,
        location: coords
      }
    );
  }
}
