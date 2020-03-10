import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'ar-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userClaims: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
      console.log(this.userClaims);
    });
  }

  LogOut() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}
