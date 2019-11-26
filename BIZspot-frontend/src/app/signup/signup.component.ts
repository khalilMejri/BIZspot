import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    description: new FormControl(''),
  })
  
  errorMessage: string;
  
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onSubmit(){
    console.log("Signup submited ",this.signupForm.value);

    this.userService.signup(this.signupForm.value).subscribe(
      (response) => {
        const link = ['login'];
        this.router.navigate(link);
      },
      (error) => {
        this.errorMessage = 'Cannot connect to server';
        console.log(error);
      }
    );
  }
}
