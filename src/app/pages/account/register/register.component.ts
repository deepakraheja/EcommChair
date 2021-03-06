import { Component, OnInit, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { UsersService } from 'src/app/Service/users.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { ThanksComponent } from '../thanks/thanks.component';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public isPersonal: boolean = true;

  public inputType = 'password';
  public class = 'fa fa-eye';
  public validate: boolean = false;
  public verifyMOtp: boolean = false;
  //showMask = false;
  NumberMask = null;


  RegistrationForm: FormGroup;

  //@ViewChild("otp") nameField: ElementRef;

  GSTNo: any;
  PANNo: any;
  AadharCard: any;

  // editName(): void {
  //   this.nameField.nativeElement.focus();
  // }

  // formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  // @ViewChildren('formRow') rows: any;

  phoneMask = null;
  showMask: boolean = false;
  public verified: boolean = false;
  public mobileverified: boolean = false;

  //public validate: boolean = true;
  public counter;

  loginStart: boolean = false;
  submitted: boolean = false;
  VerifyStart: boolean = false;

  public mvaldate: boolean = true;

  emailOTP: boolean = false;
  mobileOTP: boolean = false;
  mobileotpSendStart: boolean;
  errorShow: number = 1;
  mobilecode: string = "";
  PhoneMask: string;
  BusinessPhone: any;
  PinCodeMask: string;
  txtPinCode: any;
  AadharNumberMask: string;
  Personal: number;
  Bbuyer: boolean;

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

  @ViewChild("SetFocus") nameField: ElementRef
  setFocus(): void {
    this.nameField.nativeElement.focus();
  }

  get OTPFormArray() {
    return this.RegistrationForm.controls.OTPArray as FormArray;
  }

  keyupEvent(event) {
    debugger;
    //$('#txtverify').selectionStart = 1
    // let pos = index;
    // if (event.keyCode === 8 && event.which === 8) {
    //   pos = index - 1;

    // }
    // if (pos > -1 && pos < this.formInput.length) {
    //   this.rows._results[pos].nativeElement.focus();
    // }

  }

  // keypressEvent(event) {
  //   debugger;
  //   // let pos = index;
  //   // if (event.keyCode === 8 && event.which === 8) {
  //   //   pos = index - 1;
  //   // } else {
  //   //   pos = index + 1;
  //   // }
  //   // if (pos > -1 && pos < this.formInput.length) {
  //   //   this.rows._results[pos].nativeElement.focus();
  //   // }

  // }

  addMask(args) {

    this.NumberMask = "000000";
    this.showMask = true;

    args.selectionEnd = args.selectionStart;
  }

  addAadharMask(obj: object) {
    this.AadharNumberMask = "0000 0000 0000";
    this.showMask = false;

  }

  addPhoneMask(obj: Object) {
    //this.DecimalMask = "0*.00";
    this.PhoneMask = "0000000000";
    this.showMask = false;
  }

  addPinCodeMask(obj: Object) {
    //this.DecimalMask = "0*.00";
    this.PinCodeMask = "000000";
    //this.showMask = true;
  }

  // @ViewChild("SetFocus") nameField: ElementRef
  // setFocus(): void {
  //   this.nameField.nativeElement.focus();
  // }

  ngOnInit(): void {
    this.RegistrationForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      //email: [''],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      //mobilecode: ['', [Validators.required]],
      //OTPArray: new FormArray([]),

      BusinessType: [''],
      Industry: [''],
      businessLicenseType: ['GSTIN'],
      GSTNo: ['', [Validators.required]],
      PANNo: [''],
      AadharCard: [''],
      BusinessName: ['', [Validators.required]],
      BusinessPhone: [''],
      Address1: [''],
      Address2: [''],
      pinCode: [''],
      city: [''],
      state: [''],
      mobileotp: [''],
      //IsPersonal: ['', Validators.required],
      IsPersonal: [false],
      IsBusiness: [false]

      //otp1: ['',],
      //otp2: ['',],
      //otp4: ['',],
      //otp5: ['',],
      //otp6: ['',]
    });

    //this.formInput.forEach(() => this.OTPFormArray.push(new FormControl('')));

    debugger
    this.Bbuyer = Boolean(JSON.parse(localStorage.getItem('Bbuyer')));
    //alert(this.Bbuyer);

  }

  // onChangePersonal(type: number) {
  //   this.isPersonal = type == 1;
  //   const businessType = this.RegistrationForm.get('BusinessType');
  //   const businessLicenseType = this.RegistrationForm.get('businessLicenseType');
  //   const Industry = this.RegistrationForm.get('Industry');

  //   const businessName = this.RegistrationForm.get('BusinessName');
  //   const businessPhone = this.RegistrationForm.get('BusinessPhone');

  //   const gstNo = this.RegistrationForm.get('GSTNo');
  //   const panNo = this.RegistrationForm.get('PANNo');
  //   const AadharCard = this.RegistrationForm.get('AadharCard');

  //   if (type == 1) {
  //     businessType.clearValidators();
  //     businessLicenseType.clearValidators();
  //     Industry.clearValidators()
  //     businessName.clearValidators();
  //     businessPhone.clearValidators();
  //     gstNo.clearValidators();
  //     panNo.clearValidators();
  //     AadharCard.clearValidators();
  //   }
  //   else {
  //     businessType.setValidators([Validators.required]);
  //     businessLicenseType.setValidators([Validators.required]);
  //     Industry.setValidators([Validators.required]);
  //     businessName.setValidators([Validators.required]);
  //     businessPhone.setValidators([Validators.required]);
  //     gstNo.setValidators([Validators.required]);
  //     panNo.setValidators([Validators.required]);
  //     AadharCard.setValidators([Validators.required]);
  //   }

  //   businessType.updateValueAndValidity();
  //   businessLicenseType.updateValueAndValidity();
  //   Industry.updateValueAndValidity();
  //   businessName.updateValueAndValidity();
  //   businessPhone.updateValueAndValidity();
  //   gstNo.updateValueAndValidity();
  //   panNo.updateValueAndValidity();
  //   AadharCard.updateValueAndValidity();
  // }

  Change() {
    this.mobileOTP = false
    //this.RegistrationForm.setValue('mobileotp') = '';

  }

  // ChangeLicenseType() {

  //   debugger;
  //   // $('#txtGSTNo').val("");

  //   const gstNo = this.RegistrationForm.get('GSTNo');
  //   const panNo = this.RegistrationForm.get('PANNo');
  //   const AadharCard = this.RegistrationForm.get('AadharCard');

  //   gstNo.reset();
  //   panNo.reset();
  //   AadharCard.reset();
  //   // $('#txtGSTNo').attr("value", "");
  //   // $('#txtPANNo').attr("value", "");
  //   // $('#txtAadharCard').attr("value", "");

  //   //const gstNo = this.RegistrationForm.get('GSTNo');
  //   //gstNo.updateValueAndValidity();
  // }

  keydownEvent(event) {
    debugger
    if (this.mobileOTP) {

      event.preventDefault();
      event.stopPropagation();

      return false;

    }

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

  keytabVerify(event) {
    debugger
    const input = event.target;
    const length = input.value.length;

    if (length >= 5) {
      let element = event.srcElement.nextElementSibling; // get the sibling element

      if (element == null)  // check if its null
        return;
      else
        element.focus();   // focus if not null
    }
  }


  // onInputEntry(event, nextInput) {

  //   const input = event.target;
  //   const length = input.value.length;
  //   const maxLength = input.attributes.maxlength.value;

  //   if (length >= maxLength) {

  //     $('#' + nextInput).focus();
  //     //$('#input2').focus();
  //     // nextInput.focus();
  //   }
  // }

  get f() { return this.RegistrationForm.controls; }

  // formControlValueChanged() {

  //   const businessLicenseType = this.RegistrationForm.get('businessLicenseType');
  //   const gstNo = this.RegistrationForm.get('GSTNo');
  //   const panNo = this.RegistrationForm.get('PANNo');
  //   const AadharCard = this.RegistrationForm.get('AadharCard');


  //   if (businessLicenseType.value == 'GSTIN') {
  //     gstNo.setValidators([Validators.required]);

  //     panNo.clearValidators();
  //     AadharCard.clearValidators();

  //     gstNo.updateValueAndValidity();
  //     panNo.updateValueAndValidity();
  //     AadharCard.updateValueAndValidity();
  //   }
  //   else if (businessLicenseType.value == 'BusinessPAN') {

  //     panNo.setValidators([Validators.required]);

  //     gstNo.clearValidators();
  //     AadharCard.clearValidators();

  //     gstNo.updateValueAndValidity();
  //     panNo.updateValueAndValidity();
  //     AadharCard.updateValueAndValidity();
  //   }
  //   else if (businessLicenseType.value == 'AadharCard') {

  //     AadharCard.setValidators([Validators.required]);

  //     panNo.clearValidators();
  //     gstNo.clearValidators();

  //     AadharCard.updateValueAndValidity();
  //     gstNo.updateValueAndValidity();
  //     panNo.updateValueAndValidity();
  //   }
  // }

  //*****************************Validate mobile && call checkMobileAlreadyExist function************/
  validateAndCheckMobile() {
    this.submitted = true;
    if (this.f.mobileNo.errors) {

      if (this.f.mobileNo.errors.required) {
        this.showMessage('Please, Enter 10 digit Mobile Number.');
        return;
      } else {
        this.showMessage('Please, Enter 10 digit Mobile Number.');
        return;
      }
    } else {
      this.submitted = false;
      this.checkMobileAlreadyExist();
    }
  }


  //*****************************Check mobile Already Exist in the database or not*********************/

  checkMobileAlreadyExist() {
    ;
    this.loginStart = true;

    //this.spinner.show();
    let obj = {
      "MobileNo": this.RegistrationForm.get('mobileNo').value
    }

      ;
    this.mobileotpSendStart = true;
    this.userService.CheckMobileAllReadyRegisteredOrNot(obj).subscribe((res: any) => {
      debugger
      this.loginStart = false;
      // $('#txtverify').focus();
      //this.setFocus();
      //$('#txtverify').val('0')

      //setTimeout(() => this.spinner.hide(), 200);

      if (res == 0) {
        this.sendMobileOtp();

      }
      else if (res > 0) {
        this.mobileotpSendStart = false;
        this.showMessage('You are already registered. Please log in.');
        //this.router.navigate(['/home/chair']);
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
        this.showMessage('OTP sending to this number is denied. Contact customer care at alibabachair.Com');
      }
    }, error => {
      this.mobileotpSendStart = false;
      this.toastr.error(error);
    });
  }




  //*****************************send mobile OTP************/
  sendMobileOtp() {
    debugger;
    // const OTPArray: FormArray = this.RegistrationForm.get('OTPArray') as FormArray;
    // let i: number = 0;

    // OTPArray.controls.forEach((item: FormControl) => {
    //   item.setValue("");

    // });

    // let pos = 0;
    // if (pos > -1 && pos < this.formInput.length) {
    //   this.rows._results[pos].nativeElement.focus();
    // }
    //$('#txtverify').focus();
    const mobileotp = this.RegistrationForm.get('mobileotp');
    mobileotp.setValue('');
    mobileotp.updateValueAndValidity();

    this.toastr.success('OTP has been sent.');
    this.counter = 600;// for OTP timee
    this.mobileOTP = true;
    this.Set_Time();
    setTimeout(() => {
      this.setFocus();
    }, 500);
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
  /*****************************verify mobile OTP*********************/
  verifyMobileOtp(): boolean {

    debugger;
    // //this.submitted = true;
    // this.errorShow = 1;
    // this.mobilecode = ""
    // const OTPArray: FormArray = this.RegistrationForm.get('OTPArray') as FormArray;

    // OTPArray.controls.forEach((control, i) => {

    //   if (control.value == "") {
    //     this.errorShow = 0;
    //     return;
    //   }
    //   else {
    //     if (this.mobilecode == "") {
    //       this.mobilecode = control.value
    //     }
    //     else {
    //       this.mobilecode = this.mobilecode + control.value;
    //     }
    //   }

    // });



    if (this.RegistrationForm.get('mobileotp').value == '') {
      this.showMessage('mobile otp required');
      //$('#txtverify').focus();
      this.setFocus();
      return false;
    }
    else {

      this.mobilecode = this.RegistrationForm.get('mobileotp').value
      if (this.mobilecode.length < 5) {
        this.showMessage('please enter 6 digit OTP');
        // $('#txtverify').focus();
        this.setFocus();
        return false;
      }
      //this.spinner.show();
      this.VerifyStart = true;

      let d = {
        "MobileNo": this.RegistrationForm.get('mobileNo').value,
        "OTP": this.mobilecode.replace(/\s/g, "")

      }


      this.userService.verify_mobile_otp(d).subscribe((res: any) => {
        //setTimeout(() => this.spinner.hide(), 200);
        this.VerifyStart = false;
        if (res == 1) {
          this.mobileverified = true;
          //this.validate = true;
          //this.mobileOTP = false;
          this.mvaldate = false;
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

  //****************************** Create Registration into database*************//
  CreateRegistration() {
    debugger

    if (!this.Bbuyer) {
      const businessName = this.RegistrationForm.get('BusinessName');
      businessName.clearValidators();
      businessName.updateValueAndValidity();

      const GSTNo = this.RegistrationForm.get('GSTNo');
      GSTNo.clearValidators();
      GSTNo.updateValueAndValidity();

    }

    debugger
    this.verifyMOtp = this.verifyMobileOtp();

    if (this.verifyMOtp == false)
      return;
    debugger
    this.submitted = true;

    // this.Personal = Number(this.RegistrationForm.get('IsPersonal').value);

    // if (this.Personal == 0) {
    //   this.formControlValueChanged();

    //   const IsPersonal = this.RegistrationForm.get('IsPersonal');
    //   IsPersonal.setValue(false);
    //   IsPersonal.updateValueAndValidity();
    // }
    // else {
    //   const IsPersonal = this.RegistrationForm.get('IsPersonal');
    //   IsPersonal.setValue(true);
    //   IsPersonal.updateValueAndValidity();

    // }

    if (this.RegistrationForm.invalid) {
      if ($('#fname').val() == '') {
        this.toastr.error('Please fill in all the * required fields.');
        $('#fname').focus();
        return;
      }

      // if (this.Personal == 0) {
      //   if ($('#ddlBusinessType option:selected').val() == '') {
      //     this.toastr.error('Please fill in all the * required fields.');
      //     $('#ddlBusinessType').focus();

      //     return;
      //   }

      //   if ($('#ddlIndustry option:selected').val() == '') {
      //     this.toastr.error('Please fill in all the * required fields.');
      //     $('#ddlIndustry').focus();

      //     return;
      //   }

      //   if ($('#ddlLicenseType option:selected').val() == '') {
      //     this.toastr.error('Please fill in all the * required fields.');
      //     $('#ddlLicenseType').focus();

      //     return;
      //   }

      if (this.Bbuyer) {
        if ($('#BusinessName').val() == '') {
          this.toastr.error('Please fill in all the * required fields.');
          $('#BusinessName').focus();
          return;
        }

        //if ($('#ddlLicenseType option:selected').val() == 'GSTIN') {
        this.GSTNo = $("#txtGSTNo").val().length;//this.RegistrationForm.get('GSTNo').value
        if (this.GSTNo < 15) {
          this.showMessage('Please, Enter 15-digit GST number');
          $('#txtGSTNo').focus();
          return
        }
      }
      //}
      //   else if ($('#ddlLicenseType option:selected').val() == 'BusinessPAN') {
      //     this.PANNo = $("#txtPANNo").val().length;//this.RegistrationForm.get('PANNo').value
      //     if (this.PANNo < 10) {
      //       this.showMessage('Please, Enter 10-digit PAN number');
      //       $('#txtPANNo').focus();
      //       return
      //     }
      //   }
      //   else if ($('#ddlLicenseType option:selected').val() == 'AadharCard') {

      //     this.AadharCard = $("#txtAadharCard").val().length;//this.RegistrationForm.get('AadharCard').value
      //     if (this.AadharCard < 14) {
      //       this.showMessage('Please, Enter 12-digit  Aadhar Card number');
      //       $('#txtAadharCard').focus();
      //       return
      //     }
      //   }

      //   // if (this.f.GSTNo.errors) {

      //   //   if (this.f.GSTNo.errors.required) {
      //   //     this.showMessage('Please, Enter 15-digit number GST number.');
      //   //     return;
      //   //   } else {
      //   //     this.showMessage('Please, Enter 15-digit number GST number.');
      //   //     return;
      //   //   }
      //   // }



      //   if ($('#BusinessPhone').val() == '') {
      //     $('#BusinessPhone').focus();
      //     return;
      //   }

      //   this.BusinessPhone = $("#txtBusinessPhone").val().length;//this.RegistrationForm.get('GSTNo').value
      //   if (this.BusinessPhone < 10) {
      //     this.showMessage('Please, Enter 10-digit Business Phone');
      //     $('#txtBusinessPhone').focus();
      //     return
      //   }
      // }

      // if ($('#Address1').val() == '') {
      //   $('#Address1').focus();
      //   return;
      // }
      // if ($('#PinCode').val() == '') {
      //   $('#PinCode').focus();
      //   return;
      // }


      // this.txtPinCode = $("#txtPinCode").val().length;//this.RegistrationForm.get('GSTNo').value
      // if (this.txtPinCode < 6) {
      //   this.showMessage('Please, Enter 6-digit Pin Code');
      //   $('#txtPinCode').focus();
      //   return
      // }


      // if ($('#City').val() == '') {
      //   $('#City').focus();
      //   return;
      // }

      // if ($('#ddlState option:selected').val() == '') {
      //   this.toastr.error('Please fill in all the * required fields.');
      //   $('#ddlState').focus();

      //   return;
      // }

      if ($('#txtemail').val() == '') {
        $('#txtemail').focus();
        return;
      }

      if ($('#password').val() == '') {
        $('#password').focus();
        return;
      }


      //this.RegistrationForm.markAllAsTouched();

    }
    else {
      debugger
      this.spinner.show();

      if (!this.Bbuyer) {
        const IsPersonal = this.RegistrationForm.get('IsPersonal');
        //IsPersonal.setValue(IsPersonal.value == "1" ? true : false);
        IsPersonal.setValue(true);
        IsPersonal.updateValueAndValidity();

        const IsBusiness = this.RegistrationForm.get('IsBusiness');
        IsBusiness.setValue(false);
        IsBusiness.updateValueAndValidity();
      }
      else {
        const IsPersonal = this.RegistrationForm.get('IsPersonal');
        //IsPersonal.setValue(IsPersonal.value == "1" ? true : false);
        IsPersonal.setValue(false);
        IsPersonal.updateValueAndValidity();

        const IsBusiness = this.RegistrationForm.get('IsBusiness');
        IsBusiness.setValue(true);
        IsBusiness.updateValueAndValidity();
      }

      this.userService.UserRegistration(this.RegistrationForm.value).subscribe(res => {
        debugger
        if (res <= 0) {
          setTimeout(() => this.spinner.hide(), 500);
          this.toastr.error("Something went wrong. please try again");
        }
        else if (res > 1) {
          setTimeout(() => this.spinner.hide(), 500);
          debugger
          //this.toastr.success("Thank you for registering. We will inform you as soon as your account will be approved.");
          //if (this.RegistrationForm.value.IsPersonal == true) {
          let obj = {
            LoginId: this.RegistrationForm.value.mobileNo,
            password: this.RegistrationForm.value.password,
            userType: 2
          };
          this.userService.ValidLogin(obj).subscribe(res => {
            if (res.length > 0) {
              if (res[0].statusId == 2) {
                localStorage.setItem('LoggedInUser', JSON.stringify(res));
                localStorage.setItem('Token', res[0].token);
                this._SharedDataService.AssignUser(res);
                this._SharedDataService.UserCart(res);

                //this.toastr.success("Thank you for registering with us. You should receive a confirmation text message(SMS) shortly with your user name and password reminder.");
                //  
                // this.route.paramMap.subscribe((params: ParamMap) => {
                //   if (params.get('cart') != "" && params.get('cart') != null && params.get('cart') != undefined) {
                //     this.router.navigate(['/shop/cart']);
                //   }
                //   else {
                this.router.navigate(['/home/chair']);
                this.modalService.open(ThanksComponent, {
                  size: 'md',
                  backdrop: 'static',
                  //ariaLabelledBy: 'Cart-Modal',
                  //centered: true,
                  //windowClass: 'theme-modal cart-modal CartModal'
                }).result.then((result) => {
                  `Result ${result}`
                }, (reason) => {
                  this.modalService.dismissAll();
                });

                //   }
                // });
              }
            }
          });
          //}
          // if (this.RegistrationForm.value.IsPersonal == false) {
          //   this.router.navigate(['/home/chair']);
          //   this.modalService.open(ThanksComponent, {
          //     size: 'md',
          //     //ariaLabelledBy: 'Cart-Modal',
          //     centered: true,
          //     //windowClass: 'theme-modal cart-modal CartModal'
          //   }).result.then((result) => {
          //     `Result ${result}`
          //   }, (reason) => {
          //     this.modalService.dismissAll();
          //   });
          // }
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

  Login() {
    this.modalService.open(LoginComponent, {
      size: 'lg',
      ariaLabelledBy: 'Cart-Modal',
      centered: true,
      windowClass: 'theme-modal cart-modal CartModal'
    });
  }

}
