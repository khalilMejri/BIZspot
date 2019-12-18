import { Message } from "primeng/api";
import { Router } from "@angular/router";
import { User } from "./../models/user";
import { UserService } from "./../services/user.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { catchError } from "rxjs/operators";
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });
  user: User;
  _this;

  msgs: Message[] = [];

  constructor(private loginService: UserService, private router: Router,private notificationService:NotificationService) {
    this.user = {
      email: "",
      password: "",
      fname: "",
      lname: "",
      age: ""
    };
  }

  ngOnInit() {}
  onSubmit() {
    console.log("Login submited ", this.loginForm.value);

    this._this = this;
    console.log(this.user);
    this.loginService.login(this.user).subscribe(
      _loginToken => {
        localStorage.setItem("token", _loginToken.id);
        this.loginService.getUserById(_loginToken.userId).subscribe(user => {
          // authorization required !!
          localStorage.setItem("currentUser", user.fname + " " + user.lname);
          localStorage.setItem("role", user.role);
          localStorage.setItem("email", user.email);
          localStorage.setItem("currentUserId", _loginToken.userId); // we need to store the id so that we can get it directly from localStorage to use getUserById
          const token = localStorage.getItem("token");
          if (token === "") {
            console.log("You cannot connect now! server unavailable");
           
            this.notificationService.addNotification({"text": "Server problem, Try later","type":"danger"})
          }
          this.router.navigateByUrl("feed");
        });
      },
      error => {
        catchError(error);
        if (error.status === 401) {
          console.log(
           
          );
          this.notificationService.addNotification({"text": "Unrecognized user, Check your credentials","type":"notify"})
        } else {
          console.log("A problem occurred, try again later");
          
          this.notificationService.addNotification({"text": "Problem Occurred, Try later","type":"danger"})
        }
      }
    );
  }
  ngOnDestroy() {
    this.notificationService.resetAll()
  }
}
