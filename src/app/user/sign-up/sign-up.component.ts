import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/user.model';
import {NgForm} from '@angular/forms';
import {UserService} from '../../shared/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'ar-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
      this.user = {
        Email: '',
        LastName: '',
        FirstName: '',
        Password: '',
        UserName: ''
      };
    }
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.Succeeded === true) {
          console.log(data);
          this.resetForm(form);
          this.toastr.success('User registration successful');
        }
        else {
          this.toastr.error(data.Errors[0]);
        }
      });
  }

}
