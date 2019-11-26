import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  isLogged() {
    return this.userService.isLogged();
  }

  logout() {
    // const token = localStorage.getItem('token');
    // this.userService.logout().subscribe(
    //   (response) => {
    //     console.log('User logged out');
    //     const link = ['login'];
    //     this.router.navigate(link);
    //   },
    //   (error) => {
    //     console.log('Could not log out: \n',error);
    //   }
    // );
    this.userService.logout();
  }

}
