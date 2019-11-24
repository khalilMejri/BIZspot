import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    date: new FormControl(''),
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
  })
  constructor() { }

  ngOnInit() {
  }
  onSubmit(){
    console.log("Profile changed ",this.profileForm.value)
  }
}
