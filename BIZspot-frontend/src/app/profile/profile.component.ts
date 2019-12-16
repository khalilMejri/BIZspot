import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
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
    profile_pic: new FormControl('')
  })
  settingsForm = new FormGroup({
    theme:new FormControl(''),
    font:new FormControl(''),
    fontSize:new FormControl(''),
    language:new FormControl(''),
    
  })

  currentUser: User;
  errorMessage: string;
  profile_pic_path: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  getUserById() {
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

  ngOnInit() {
    this.getUserById();
  }

  applyUpdateLocally() {
    // these tests are essential since if we won't change any field's value, it'll be an empty string
    // even though we did initialize them
    if (this.profileForm.value.fname) this.currentUser.fname = this.profileForm.value.fname;
    if (this.profileForm.value.lname) this.currentUser.lname = this.profileForm.value.lname;
    if (this.profileForm.value.age) this.currentUser.age = this.profileForm.value.age;
    if (this.profileForm.value.newPassword) this.currentUser.password = this.profileForm.value.newPassword;
    //if (this.profileForm.value.profile_pic) this.currentUser.profile_pic = this.profile_pic_path;
  }

  updateUser() {
    this.userService.updateUser(this.currentUser).subscribe(
      (user) => {
        console.log('updated user: \n', user);
        /*const link = ['feed'];
        this.router.navigate(link);
        */
        // we don't navigate to feed just reload the user
        this.getUserById()
      },
      (error) => {
        console.log('no update, error');
      }
    );
  }

  onSubmit(){
    this.applyUpdateLocally();
    this.updateUser();
  }

  onSettingSubmit(){
    console.log(this.settingsForm.value);
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.currentUser.profile_pic = event.target.result;
        console.log(this.profile_pic_path);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
