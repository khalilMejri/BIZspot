import { EnvService } from "./../env.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginToken } from "./../models/loginToken";
import { User } from "./../models/user";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { LatLng } from "@agm/core";
import { Subscription } from "../models/subscription";

@Injectable({
  providedIn: "root"
})
export class UserService {
  // private apiUrl = "http://localhost:3000/api/users";
  // private api = "http://localhost:3000/api"

  route: string = "/users";

  constructor(
    private client: HttpClient,
    private router: Router,
    private envService: EnvService
  ) {}

  getUsers() {
    return this.client.get<User[]>(this.envService.apiUrl + this.route);
  }

  getUserById(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "No-Auth": "True"
      })
    };
    return this.client.get<User>(
      this.envService.apiUrl + this.route + "/" + id
    );
  }

  deleteUser(idUser: string) {
    return this.client.delete(
      this.envService.apiUrl + this.route + "/" + idUser
    );
  }

  addUser(user: User) {
    const headers = new Headers({ "Content-Type": "application/json" });

    return this.client.post(this.envService.apiUrl + this.route, user);
  }

  updateUser(user: User) {
    const headers = new Headers({ "Content-Type": "application/json" });

    return this.client.patch(
      this.envService.apiUrl + this.route + `/${user.id}`,
      user
    );
  }

  login(user: User) {
    let headers: HttpHeaders = new HttpHeaders();
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // head.append('Access-Control-Allow-Headers', 'Content-Type');
    // head.append('Access-Control-Allow-Methods', 'POST');
    // head.append('Access-Control-Allow-Origin', '*');
    headers.append("No-Auth", "True");
    return this.client.post<LoginToken>(
      this.envService.apiUrl + this.route + "/login",
      user,
      {
        headers
      }
    );
  }

  logout() {
    // const headers = new Headers({ "Content-Type": "application/json" });

    // return this.client.post(
    //   this.envService.apiUrl + this.route + "/logout?access_token=" + token,
    //   null
    // );
    localStorage.removeItem("token");
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    // localStorage.clear();
    const link = ["login"];
    this.router.navigate(link);
  }

  signup(user: User): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append("No-Auth", "True");

    return this.client.post<User>(this.envService.apiUrl + this.route, user, {
      headers
    });
  }

  isLogged() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  getLocation(): LatLng {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        return { lat: latitude, lng: longitude };
      });
    } else {
      console.log("No support for geolocation");
      return null;
    }
  }

  createSubscription(subscription: Subscription) {
    return this.client.post<Subscription>(
      this.envService.apiUrl + "/subscriptions",
      subscription
    );
  }

  deleteSubscription(subscriptionId: string) {
    return this.client.delete(
      this.envService.apiUrl + "/subscriptions/" + subscriptionId
    );
  }

  isSubscribed(userId: string, businessId: string) {
    return this.client.get<Subscription>(
      `${this.envService.apiUrl}/subscriptions/findOne?filter[where][and][0][userId]=${userId}&filter[where][and][1][businessId]=${businessId}`
    );
  }

  getSubscriptions(userId: string) {
    return this.client.get<Subscription[]>(
      `${this.envService.apiUrl}/subscriptions?filter[where][userId]=${userId}`
    );
  }

  findTopReviewers(limit: number) {
    return this.client.get<User[]>(
      `${this.envService.apiUrl +
        this.route}?filter[order]=nb_reviews DESC&filter[limit]=${limit}`
    );
  }
}
