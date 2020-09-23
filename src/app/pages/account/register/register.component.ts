import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { UsersService } from 'src/app/Service/users.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  RegistrationForm: FormGroup;


  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;

  phoneMask = null;
  showMask: boolean = false;
  public verified: boolean = false;
  public mobileverified: boolean = false;

  public validate: boolean = true;
  public counter;

  loginStart = false;
  submitted = false;

  public mvaldate: boolean = true;

  emailOTP: boolean = false;
  mobileOTP: boolean = false;
  mobileotpSendStart: boolean;
  errorShow: number = 1;
  mobilecode: any = "";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private _SharedDataService: SharedDataService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {

    //this.RegistrationForm = this.toFormGroup(this.formInput);
  }
  // toFormGroup(elements) {
  //   const group: any = {};

  //   elements.forEach(key => { group[key] = new FormControl('', Validators.required); });
  //   return new FormGroup(group);
  // }

  get OTPFormArray() {
    return this.RegistrationForm.controls.OTPArray as FormArray;
  }

  keyUpEvent(event, index) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }

  }

  ngOnInit(): void {
    this.RegistrationForm = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      //mobilecode: ['', [Validators.required]],
      OTPArray: new FormArray([]),

      BusinessType: ['', Validators.required],
      Industry: ['', Validators.required],
      businessLicenseType: ['', Validators.required],
      GSTNo: ['', Validators.required],
      PANNo: ['', Validators.required],

      BusinessName: ['', Validators.required],
      BusinessPhone: ['', Validators.required],
      Address1: ['', Validators.required],
      Address2: ['', Validators.required],
      pinCode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });

    this.formInput.forEach(() => this.OTPFormArray.push(new FormControl('')));

  }


  get f() { return this.RegistrationForm.controls; }

  formControlValueChanged() {
    debugger
    const businessLicenseType = this.RegistrationForm.get('businessLicenseType');
    const gstNo = this.RegistrationForm.get('GSTNo');
    const panNo = this.RegistrationForm.get('PANNo');


    if (businessLicenseType.value == 'GSTIN') {
      gstNo.setValidators([Validators.required]);
      panNo.clearValidators();

      gstNo.updateValueAndValidity();
      panNo.updateValueAndValidity();
    }
    if (businessLicenseType.value == 'BusinessPAN') {
      panNo.setValidators([Validators.required]);
      gstNo.clearValidators();

      gstNo.updateValueAndValidity();
      panNo.updateValueAndValidity();
    }

  }

  //*****************************Validate mobile && call checkMobileAlreadyExist function************/
  validateAndCheckMobile() {
    ;
    if (this.f.mobileNo.errors) {
      if (this.f.mobileNo.errors.required) {
        this.showMessage('Please, Enter 10 digit Mobile Number.');
      } else {
        this.showMessage('Please, Enter 10 digit Mobile Number.');
      }
    } else {

      this.checkMobileAlreadyExist();
    }
  }


  //*****************************Check mobile Already Exist in the database or not*********************/

  checkMobileAlreadyExist() {

    this.spinner.show();
    let obj = {
      "MobileNo": this.RegistrationForm.get('mobileNo').value
    }

      ;
    this.mobileotpSendStart = true;
    this.userService.CheckMobileAllReadyRegisteredOrNot(obj).subscribe((res: any) => {
      setTimeout(() => this.spinner.hide(), 500);

      if (res == 0) {
        this.sendMobileOtp();

      }
      else if (res > 0) {
        this.mobileotpSendStart = false;
        this.showMessage('You are already registered. Please log in.');
        this.router.navigate(['/home/fashion']);
        this.modalService.open(LoginComponent, {
          size: 'lg',
          //ariaLabelledBy: 'Cart-Modal',
          centered: true,
          //windowClass: 'theme-modal cart-modal CartModal'
        }).result.then((result) => {
          `Result ${result}`
        }, (reason) => {
          this.modalService.dismissAll();
        });

      }
      else {
        this.showMessage('OTP sending to this number is denied - Contact customer care');
      }
    }, error => {
      this.mobileotpSendStart = false;
      this.toastr.error(error);
    });
  }

  //*****************************send mobile OTP************/
  sendMobileOtp() {

    const OTPArray: FormArray = this.RegistrationForm.get('OTPArray') as FormArray;
    let i: number = 0;
    OTPArray.controls.forEach((item: FormControl) => {
      item.setValue("");
    });

    this.toastr.success('OTP has been sent');
    this.counter = 60;// for OTP time
    this.mobileOTP = true;
    this.Set_Time();

  }
  /*****************************verify mobile OTP*********************/
  verifyMobileOtp() {


    //this.submitted = true;
    this.errorShow = 1;
    this.mobilecode = ""
    const OTPArray: FormArray = this.RegistrationForm.get('OTPArray') as FormArray;

    OTPArray.controls.forEach((control, i) => {

      if (control.value == "") {
        this.errorShow = 0;
        return;
      }
      else {
        if (this.mobilecode == "") {
          this.mobilecode = control.value
        }
        else {
          this.mobilecode = this.mobilecode + control.value;
        }
      }

    });



    if (this.errorShow == 0) {
      this.showMessage('mobile otp required');
    }
    else {

      this.spinner.show();

      let d = {
        "MobileNo": this.RegistrationForm.get('mobileNo').value,
        "OTP": this.mobilecode

      }


      this.userService.verify_mobile_otp(d).subscribe((res: any) => {
        setTimeout(() => this.spinner.hide(), 500);
        ;
        if (res == 1) {
          this.mobileverified = true;
          this.mobileOTP = false;
          this.mvaldate = false;
        } else if (res == 0) {
          this.toastr.error('Invalid OTP');

        } else if (res == 2) {

          this.toastr.error('Invalid OTP');
        } else {
          this.toastr.error('Exception Error');
        }
      }, (err) => {
        this.toastr.error(err.error);
      });
    }


  }


  //******************************Show Error message*************//
  showMessage(str) {
    this.toastr.error(str);
  }

  //****************************** CreateRegistration*************//
  CreateRegistration() {
    debugger
    this.formControlValueChanged();
    this.submitted = true;
    if (this.RegistrationForm.invalid) {
      this.RegistrationForm.markAllAsTouched();
      this.toastr.error('All the * marked fields are mandatory');
      return;
    }
    else {
      this.spinner.show();
      this.userService.UserRegistration(this.RegistrationForm.value).subscribe(res => {
        if (res <= 0) { 
          setTimeout(() => this.spinner.hide(), 500);
          this.toastr.error("Something went wrong. please try again");
        }
        else if (res > 1) {
          setTimeout(() => this.spinner.hide(), 500);
          this.toastr.success("Thank you for registering. We will inform you as soon as your account will be approved.");
          // let obj = {
          //   LoginId: this.RegistrationForm.value.email,
          //   password: this.RegistrationForm.value.password
          // };
          // this.userService.ValidLogin(obj).subscribe(res => {
          //   if (res.length > 0) {

          //     sessionStorage.setItem('LoggedInUser', JSON.stringify(res));
          //     this._SharedDataService.AssignUser(res);
          //     //  
          //     this.route.paramMap.subscribe((params: ParamMap) => {
          //       if (params.get('cart') != "" && params.get('cart') != null && params.get('cart') != undefined) {
          //         this.router.navigate(['/shop/cart']);
          //       }
          //       else {
          //         this.router.navigate(['/home/fashion']);
          //       }
          //     });
          //   }
          // });

          this.router.navigate(['/home/fashion']);
        }
        else {
          setTimeout(() => this.spinner.hide(), 500);
          this.toastr.error("You are already registered. Please log in.");
          this.modalService.open(LoginComponent, {
            size: 'lg',
            //ariaLabelledBy: 'Cart-Modal',
            centered: true,
            //windowClass: 'theme-modal cart-modal CartModal'
          }).result.then((result) => {
            `Result ${result}`
          }, (reason) => {
            this.modalService.dismissAll();
          });
          return;
        }
      });
    }
  }

  //******************************Show Resend OTP in*************//
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


}
