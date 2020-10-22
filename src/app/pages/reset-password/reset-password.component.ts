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
  public GUID: any;

  public inputType = 'password';
  public class = 'fa fa-eye';
  public inputTypeConfirm = 'password';
  public classConfirm = 'fa fa-eye';

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
      this.GUID = params.get('id');
    });
    this.ChangePwdForm = this.fb.group({
      NewPassword: ['', [Validators.required, Validators.minLength(8)]],
      ConfirmPwd: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {

  }



  hideShowConfirmPassword
    (): void {

    if (this.inputTypeConfirm == 'password') {
      this.inputTypeConfirm = 'text';
      this.classConfirm = 'fa fa-eye-slash';
    }
    else {
      this.inputTypeConfirm = 'password';
      this.classConfirm = 'fa fa-eye';
    }

  }


  hideShowPassword(): void {

    if (this.inputType == 'password') {
      this.inputType = 'text';
      this.class = 'fa fa-eye-slash';
    }
    else {
      this.inputType = 'password';
      this.class = 'fa fa-eye';
    }

  }

  ResetPassword() {
    this.Submitted = true;
    if (this.ChangePwdForm.invalid) {
      this.toastr.error("All * fields are mandatory.");
      return;
    }
    else if (this.ChangePwdForm.value.NewPassword != this.ChangePwdForm.value.ConfirmPwd) {
      this.toastr.error("New Password and Confirm password must be same.");
      return;
    }
    else {
      let obj = {
        GUID: this.GUID,
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
