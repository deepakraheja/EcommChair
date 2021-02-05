import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  loginStart: boolean = false;

  public class = 'fa fa-eye';
  public validate: boolean = false;
  public verifyMOtp: boolean = false;

  phoneMask = null;
  showMask: boolean = false;
  public verified: boolean = false;
  public mobileverified: boolean = false;

  //public validate: boolean = true;
  public counter;


  submitted: boolean = false;
  VerifyStart: boolean = false;

  emailOTP: boolean = false;
  mobileOTP: boolean = false;
  mobileotpSendStart: boolean;
  errorShow: number = 1;
  mobilecode: string = "";


  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) {

    this.ResetPasswordForm = this.formBuilder.group({
      //email: ['', [Validators.required, Validators.email]]
      mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      mobileotp: ['']
    });

  }

  ngOnInit(): void {
  }

  keydownEvent(event) {
    debugger
    if (this.mobileOTP) {

      event.preventDefault();
      event.stopPropagation();

      return false;

    }

  }

  ResetPassword() {
    if (this.ResetPasswordForm.value.mobileNo == "") {
      this.toastr.error('Please, Enter 10 digit Mobile Number.');
      return;
    }
    if (this.ResetPasswordForm.invalid) {
      this.toastr.error('Please, Enter 10 digit Mobile Number.');
      return;
    }
    this.spinner.show();


    // this.userService.ValidEmail(this.ResetPasswordForm.value).subscribe(res => {
    //   this.spinner.hide();
    //   if (res < 0) {
    //     //setTimeout(() => this.spinner.hide(), 500);
    //     this.toastr.error("Something went wrong. please try again");
    //     return;
    //   }
    //   if (res == 1) {
    //     this.toastr.success('An email has been sent to your mailbox for password reset.'); 
    //     this.router.navigate(['/home/chair']);
    //   }
    //   else {
    //     this.toastr.error('Email does not exist.');
    //   }

    // });
  }

  keytab(event) {
    debugger
    if (this.mobileverified)
      event.preventDefault();

    const input = event.target;
    const length = input.value.length;

    if (length >= 11) {
      let element = event.srcElement.nextElementSibling; // get the sibling element

      if (element == null)  // check if its null
        return;
      else
        element.focus();   // focus if not null
    }
  }

  //*****************************Check mobile Already Exist in the database or not*********************/

  SendOtp() {
    debugger;
    this.loginStart = true;
    if (this.ResetPasswordForm.value.mobileNo == "") {
      this.toastr.error('Please, Enter 10 digit Mobile Number.');
      return;
    }
    if (this.ResetPasswordForm.invalid) {
      this.toastr.error('Please, Enter 10 digit Mobile Number.');
      return;
    }
    //this.spinner.show();

    let obj = {
      "MobileNo": this.ResetPasswordForm.get('mobileNo').value
    }



    this.userService.SendMobileOTPforgotpassword(obj).subscribe((res: any) => {
      debugger
      this.loginStart = false;


      if (res == 0) {
        this.mobileOTP = true;
        this.sendMobileOtp();

      }

      else {
        //this.showMessage('OTP sending to this number is denied - Contact customer care');
      }
    }, error => {

      this.toastr.error(error);
    });
  }

  //*****************************send mobile OTP************/
  sendMobileOtp() {
    debugger;

    const mobileotp = this.ResetPasswordForm.get('mobileotp');
    mobileotp.setValue('');
    mobileotp.updateValueAndValidity();

    this.toastr.success('OTP has been sent.');

    this.counter = 60;// for OTP time
    this.mobileOTP = true;
    this.Set_Time();
    setTimeout(() => {
      this.setFocus();
    }, 500);

  }
  Set_Time() {

    if (this.counter != 0) {
      this.counter--;

    }
    else {
      clearTimeout();
    }

    setTimeout(() => {

      if (this.counter > 0) {
        this.Set_Time();
      }
      if (this.counter == 0) {
        this.mobileOTP = false;

      }

    }, 1000);

  }

  @ViewChild("SetFocus") nameField: ElementRef
  setFocus(): void {
    this.nameField.nativeElement.focus();
  }
  verifyMobileOtp(): boolean {

    debugger;
    
    if (this.ResetPasswordForm.get('mobileotp').value == '') {
      this.showMessage('mobile otp required');
      //$('#txtverify').focus();
      this.setFocus();
      return false;
    }
    else {

      this.mobilecode = this.ResetPasswordForm.get('mobileotp').value
      if (this.mobilecode.length < 5) {
        this.showMessage('please enter 6 digit OTP');
        // $('#txtverify').focus();
        this.setFocus();
        return false;
      }
      //this.spinner.show();
      this.VerifyStart = true;

      let d = {
        "MobileNo": this.ResetPasswordForm.get('mobileNo').value,
        "OTP": this.mobilecode.replace(/\s/g, "")

      }


      this.userService.verify_mobile_otp(d).subscribe((res: any) => {
        //setTimeout(() => this.spinner.hide(), 200);
        this.VerifyStart = false;
        if (res == 1) {
          this.mobileverified = true;
         
          return true;
        } else if (res == 0) {
          this.toastr.error('Invalid OTP');
          return false;

        } else if (res == 2) {

          this.toastr.error('Invalid OTP');
          return false;
        } else {
          this.toastr.error('Exception Error');
          return false;
        }
        return true;

      }, (err) => {
        this.toastr.error(err.error);
        return false;
      });
    }
  

  }


  //******************************Show Error message*************//
  showMessage(str) {
    this.toastr.error(str);
  }

}
