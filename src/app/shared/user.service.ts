import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
// import 'rxjs/add/operator/map';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'http://localhost:59716/';
  headers = new HttpHeaders();

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email
    }
    return this.http.post(this.rootUrl + 'api/User/Register', body);
  }

  userAuthentication(userName, password) {
    const data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post(this.rootUrl + 'token', data, {headers: reqHeaders});
  }

  getUserClaims() {
    // setTimeout(() => {
    //   return this.http.get(this.rootUrl + 'api/GetUserClaims', {headers: new HttpHeaders({
    //       'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    //     })});
    // }, 1000);
      return this.http.get(this.rootUrl + 'api/GetUserClaims', {headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        })});
  }
}
