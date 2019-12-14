import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  apiUrl = "http://localhost:3000/api/reviews";
  
  constructor(
    private httpClient: HttpClient
  ) { }

  createReview(review: Review) {
    return this.httpClient.post<Review>(`${this.apiUrl}`, review);
  }

  deleteReview(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }

  getReviewById(id: string) {
    return this.httpClient.get<Review>(`${this.apiUrl}/${id}`);
  }

  getReviews() {
    return this.httpClient.get<Review[]>(`${this.apiUrl}`);
  }
  
}
