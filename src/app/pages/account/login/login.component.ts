import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Service/users.service';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginStart = false;
  LoginForm: FormGroup;
  submitted: boolean = false;

  public inputType = 'password';
  public class = 'fa fa-eye';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private _SharedDataService: SharedDataService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,


  ) { }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      LoginId: ['', Validators.required],
      password: ['', Validators.required],
      userType: 2
    });
  }

  get f() { return this.LoginForm.controls; }


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


  Register() {
    this.router.navigate(['/pages/register']);
    this.modalService.dismissAll();
  }

  close() {
    this.modalService.dismissAll();
  }

  Login() {
    debugger
    this.submitted = true;
    if (this.LoginForm.invalid) {
      this.toastr.error('All the * marked fields are mandatory');
      return;
    }
    else {
      //this.spinner.show();

      this.loginStart = true;
      this.userService.ValidLogin(this.LoginForm.value).subscribe(res => {
        this.loginStart = false;
        //setTimeout(() => this.spinner.hide(), 500);
        if (res.length > 0) {
          if (res[0].isAgent == 1) {
            this.toastr.error('You are an agent.');
            return;
          }
          if (res[0].statusId == 1) {
            this.toastr.error('Your login is pending. Please wait for approval.');
            return;
          }
          else if (res[0].statusId == 3) {
            this.toastr.error('Your login approval is denied.');
            return;
          }
          else if (res[0].statusId == 4) {
            this.toastr.error('Your account has been put on hold.');
            return;
          }
          else if (res[0].statusId == 2) {
            sessionStorage.setItem('LoggedInUser', JSON.stringify(res));
            sessionStorage.setItem('Token', res[0].token);

            this._SharedDataService.AssignUser(res);
            this._SharedDataService.UserCart(res);
            //this.router.navigate(['/home/fashion']);
            //  
            // this.route.paramMap.subscribe((params: ParamMap) => {
            //   if (params.get('cart') != "" && params.get('cart') != null && params.get('cart') != undefined) {
            //     this.router.navigate(['/shop/cart']);
            //   }
            //   else {
            //     this.router.navigate(['/home/fashion']);
            //   }
            // });
            this.modalService.dismissAll();
            //this.toastr.error('You approval is pending.');
          }
        }
        else {
          this.toastr.error('Your username or password is incorrect');
          return;
        }
      });
    }
  }
}
