import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    age: new FormControl('', [Validators.min(1)]),
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
  })

  currentUser: User;
  errorMessage: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUserById(localStorage.getItem('currentUserId')).subscribe(
      (user) => {
        this.currentUser = user;
      },
      (error) => {
        this.errorMessage = 'Cannot connect to server';
        console.log('Could not get user data');
        console.log(error);
      }
    );
  }
  onSubmit(){
    console.log("Profile changed ",this.profileForm.value);
    if(this.profileForm.value.fname) this.currentUser.fname = this.profileForm.value.fname;
    if(this.profileForm.value.lname) this.currentUser.lname = this.profileForm.value.lname;
    if(this.profileForm.value.age) this.currentUser.age = this.profileForm.value.age;

    this.userService.updateUser(this.currentUser).subscribe(
      (user) => {
        console.log('updated user: \n', user);
      },
      (error) => {
        console.log('no update, error');
      }
    );
  }
}
