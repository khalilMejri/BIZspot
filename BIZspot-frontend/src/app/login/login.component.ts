import { Router } from "@angular/router";
import { User } from "./../models/user";
import { UserService } from "./../services/user.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { catchError } from "rxjs/operators";

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

  constructor(private loginService: UserService, private router: Router) {
    this.user = {
      email: "",
      password: ""
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
          const token = localStorage.getItem("token");
          if (token === "") {
            console.log("You cannot connect now! server unavailable");
          }
          this.router.navigateByUrl("profile");
        });
      },
      error => {
        catchError(error);
        if (error.status === 401) {
          console.log(
            "Unrecognized user, You can check your email first or contact our support"
          );
        } else {
          console.log("A problem occurred, try again later");
        }
      }
    );
  }
}
