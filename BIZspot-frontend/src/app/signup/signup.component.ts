import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { Message } from "primeng/api";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    fname: new FormControl(""),
    lname: new FormControl(""),
    age: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    description: new FormControl("")
  });

  errorMessage: string;
  msgs: Message[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}
  onSubmit() {
    console.log("Signup submited ", this.signupForm.value);

    this.userService.signup(this.signupForm.value).subscribe(
      response => {
        console.log("response: ", response);
        console.log("sign up completed, you will be logged in in a sec");
        this.msgs.push({
          severity: "info",
          summary: "Message",
          detail: "Sign up completed, you will be logged in in a sec"
        });
        // as soon as a user signs up he'll be logged in directly
        this.userService.login(this.signupForm.value).subscribe(_loginToken => {
          localStorage.setItem("token", _loginToken.id);
          this.userService.getUserById(_loginToken.userId).subscribe(user => {
            // authorization required !!
            localStorage.setItem("currentUser", user.fname + " " + user.lname);
            localStorage.setItem("role", user.role);
            localStorage.setItem("email", user.email);
            localStorage.setItem("currentUserId", _loginToken.userId); // we need to store the id so that we can get it directly from localStorage to use getUserById
            sessionStorage.setItem("password", this.signupForm.value.password); // we need the password since we can't update a user later without a pwd in case he didn't change it
            const token = localStorage.getItem("token");
            if (token === "") {
              console.log("You cannot connect now! server unavailable");
              this.msgs.push({
                severity: "error",
                summary: "Error Message",
                detail: "You cannot connect now! server unavailable"
              });
            }
            this.router.navigateByUrl("profile");
          });
        });
      },
      error => {
        this.errorMessage = "Cannot connect to server";
        this.msgs.push({
          severity: "warn",
          summary: "Warning Message",
          detail: "Could not sign up! please verify your credentials"
        });

        console.log("could not sign up");
        console.log(this.signupForm.value);
        console.log(error);
      }
    );
  }
}
