import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { Message } from "primeng/api";
import { User } from '../models/user';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    fname: new FormControl("", Validators.required),
    lname: new FormControl("", Validators.required),
    age: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
    description: new FormControl(""),
    profile_pic: new FormControl("")
  });

  errorMessage: string;
  msgs: Message[] = [];
  profile_pic_path: string;
  newUser: User;

  constructor(private userService: UserService, private router: Router,private notificationService:NotificationService) {}

  ngOnInit() {}

  setLocalStorage(user: User, userId: string) {
    localStorage.setItem("currentUser", user.fname + " " + user.lname);
    localStorage.setItem("role", user.role);
    localStorage.setItem("email", user.email);
    localStorage.setItem("currentUserId", userId); // we need to store the id so that we can get it directly from localStorage to use getUserById
  }

  loginUser() {
    this.userService.login(this.signupForm.value).subscribe(
      _loginToken => {
        localStorage.setItem("token", _loginToken.id);
        this.userService.getUserById(_loginToken.userId).subscribe(user => {
          // authorization required !!
          this.setLocalStorage(user, _loginToken.userId);
          const token = localStorage.getItem("token");
          if (token === "") {
            console.log("You cannot connect now! server unavailable");
            this.notificationService.addNotification({"text": "Server problem, Try later","type":"danger"})
            
          }
          this.router.navigateByUrl("profile");
        });
      },
      error => {
        console.log("Couldn't login :( ",error);
      }
    );
  }

  createUser() {
    this.userService.signup(this.newUser).subscribe(
      response => {
        console.log("response: ", response);
        console.log("sign up completed, you will be logged in in a sec");
        
        this.notificationService.addNotification({"text": "Sign up completed, wait redirection","type":"success"})

        // as soon as a user signs up he'll be logged in directly
        setTimeout(() => {
          this.loginUser();
        }, 1000);
        
      },
      error => {
        this.errorMessage = "Cannot connect to server";
        this.notificationService.addNotification({"text": "Canno't sign up","type":"danger"})


        console.log("could not sign up");
        console.log(this.newUser);
        console.log(error);
      }
    );
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.profile_pic_path = event.target.result;
        console.log(this.profile_pic_path);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  storeUser() {
    this.newUser = {
      "fname": this.signupForm.value.fname,
      "lname": this.signupForm.value.lname,
      "age": this.signupForm.value.age,
      "email": this.signupForm.value.email,
      "password": this.signupForm.value.password,
      "profile_pic": this.profile_pic_path,
      "nb_reviews": 0
    }
  }

  onSubmit() {
    if(this.signupForm.valid) {
      console.log("Signup submited ", this.signupForm.value);
      if (this.profile_pic_path == undefined) this.profile_pic_path = "../assets/img/avatar.jpg";
      this.storeUser();
      this.createUser();
    }
    else {
      this.notificationService.addNotification({"text": "Invalid Form","type":"notify"})
    }
  }
  ngOnDestroy() {
    this.notificationService.resetAll()
  }
}
