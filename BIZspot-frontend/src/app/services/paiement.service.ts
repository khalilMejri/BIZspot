import { EnvService } from "./../env.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PaiementService {
  // apiUrl = "http://localhost:3000/api"
  constructor(private httpClient: HttpClient, private envService: EnvService) {}

  createPaiementSession(planId) {
    var body = {
      planId: planId
    };
    return this.httpClient.post(
      `${this.envService.apiUrl}/create-checkout-session`,
      body
    );
  }
  checkPaiementSession(sessionId: string) {
    return this.httpClient.get(
      `${this.envService.apiUrl}/checkout-session?sessionId=${sessionId}`
    );
  }
  getApiKeys() {
    return this.httpClient.get(`${this.envService.apiUrl}/setup`);
  }
}
