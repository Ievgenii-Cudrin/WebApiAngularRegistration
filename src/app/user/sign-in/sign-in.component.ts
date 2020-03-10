import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'ar-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isLoginError: boolean = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  OnSubmit(userName, password) {
    this.userService.userAuthentication(userName, password)
      .subscribe((data: any) => {
        console.log(data);
        localStorage.setItem('userToken', data.access_token);
        this.router.navigate(['/home']);
      }, (err: HttpErrorResponse) => {
        console.log(err);
        this.isLoginError = true;
        });
  }

}
