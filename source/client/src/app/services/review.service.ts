import { EnvService } from "./../env.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Review } from "../models/review";
import { Business } from "../models/business";

@Injectable({
  providedIn: "root"
})
export class ReviewService {
  // apiUrl = "http://localhost:3000/api/reviews";
  route: string = "/reviews";

  constructor(private httpClient: HttpClient, private envService: EnvService) {}

  createReview(review: Review) {
    return this.httpClient.post<Review>(
      `${this.envService.apiUrl + this.route}`,
      review
    );
  }

  deleteReview(id: string) {
    return this.httpClient.delete(
      `${this.envService.apiUrl + this.route}/${id}`
    );
  }

  getReviewById(id: string) {
    return this.httpClient.get<Review>(
      `${this.envService.apiUrl + this.route}/${id}`
    );
  }

  getReviews() {
    return this.httpClient.get<Review[]>(
      `${this.envService.apiUrl + this.route}`
    );
  }

  getRecentReviews(limit: number) {
    return this.httpClient.get<Review[]>(
      `${this.envService.apiUrl +
        this.route}?filter[order]=postedAt DESC&filter[limit]=${limit}`
    );
  }
}
