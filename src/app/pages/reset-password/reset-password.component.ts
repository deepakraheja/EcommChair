import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Service/users.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public ChangePwdForm: FormGroup;
  public Submitted: boolean = false;
  public UserId: any;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      //  
      //this.GetOrderById(Number(params.get('orderId')));
      this.UserId = params.get('id');
    });
    this.ChangePwdForm = this.fb.group({
      NewPassword: ['', [Validators.required, Validators.minLength(8)]],
      ConfirmPwd: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {

  }

  ResetPassword() {
    this.Submitted = true;
    if (this.ChangePwdForm.invalid) {
      this.toastr.error("All fields are mandatory.");
      return;
    }
    else {
      let obj = {
        userID: Number(this.UserId),
        password: this.ChangePwdForm.value.password,
        NewPassword: this.ChangePwdForm.value.NewPassword
      }
      this.spinner.show();
      this._userService.ResetPassword(obj).subscribe(res => {
        this.spinner.hide();
        if (Number(res) > 0) {
          this.toastr.success("Password has been saved successfully.");
          this.router.navigate(['/home/fashion']);
        }
        else {
          this.toastr.error("Something went wrong. please try again");
          return;
        }
      });
    }
  }
}
