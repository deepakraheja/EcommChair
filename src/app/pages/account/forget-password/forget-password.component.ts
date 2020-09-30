import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Service/users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  ResetPasswordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) {

    this.ResetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  ngOnInit(): void {
  }

  ResetPassword() {
    if (this.ResetPasswordForm.value.email == "") {
      this.toastr.error('Email is required.');
      return;
    }
    if (this.ResetPasswordForm.invalid) {
      this.toastr.error('Email is not valid.');
      return;
    }
    this.spinner.show();
    this.userService.ValidEmail(this.ResetPasswordForm.value).subscribe(res => {
      this.spinner.hide();
      if (res < 0) {
        //setTimeout(() => this.spinner.hide(), 500);
        this.toastr.error("Something went wrong. please try again");
        return;
      }
      if (res == 1) {
        this.toastr.success('Password reset link has been sent on emailid.');
        this.router.navigate(['/home/fashion']);
      }
      else {
        this.toastr.error('Email does not exists.');
      }

    });
  }
}
