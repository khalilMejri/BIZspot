import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginToken } from "./../models/loginToken";
import { User } from "./../models/user";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class UserService {
  private apiUrl = "http://localhost:3000/api/users";

  constructor(
    private client: HttpClient,
    private router: Router
  ) {}

  getUsers() {
    return this.client.get<User[]>(this.apiUrl);
  }

  getUserById(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "No-Auth": "True"
      })
    };
    return this.client.get<User>(this.apiUrl + "/" + id);
  }

  deleteUser(idUser: string) {
    return this.client.delete(this.apiUrl + "/" + idUser);
  }

  addUser(user: User) {
    const headers = new Headers({ "Content-Type": "application/json" });

    return this.client.post(this.apiUrl, user);
  }

  updateUser(user: User) {
    const headers = new Headers({ "Content-Type": "application/json" });

    return this.client.put(this.apiUrl, user);
  }

  login(user: User) {
    let headers: HttpHeaders = new HttpHeaders();
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // head.append('Access-Control-Allow-Headers', 'Content-Type');
    // head.append('Access-Control-Allow-Methods', 'POST');
    // head.append('Access-Control-Allow-Origin', '*');
    headers.append("No-Auth", "True");
    return this.client.post<LoginToken>(this.apiUrl + "/login", user, {
      headers
    });
  }

  logout() {
    // const headers = new Headers({ "Content-Type": "application/json" });

    // return this.client.post(
    //   this.apiUrl + "/logout?access_token=" + token,
    //   null
    // );
    localStorage.removeItem('token');
    const link = ['login'];
    this.router.navigate(link);
  }

  signup(user: User): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append("No-Auth", "True");

    return this.client.post(this.apiUrl, user, {
      headers
    });
  }

  isLogged() {
    if (localStorage.getItem('token')) {
      return true;
    } 
    else {
      return false;
    }
  }
}
