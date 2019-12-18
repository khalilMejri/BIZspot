import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  apiUrl = "http://localhost:3000/api"
  constructor(private httpClient:HttpClient) { }

  createPaiementSession(planId){
    var body ={
      planId:planId
    }
    return this.httpClient.post(`${this.apiUrl}/create-checkout-session`,body);
    
  }
  checkPaiementSession(sessionId:string){
    return this.httpClient.get(`${this.apiUrl}/checkout-session?sessionId=${sessionId}`);
  }
  getApiKeys(){
    return this.httpClient.get(`${this.apiUrl}/setup`);
  }
}
