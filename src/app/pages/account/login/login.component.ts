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

  LoginForm: FormGroup;
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

  get f1() { return this.LoginForm.controls; }

  Register() {
    this.router.navigate(['/pages/register']);
    this.modalService.dismissAll();
  }

  close() {
    this.modalService.dismissAll();
  }

  Login() {
    if (this.LoginForm.invalid) {
      this.toastr.error('All the * marked fields are mandatory');
      return;
    }
    else {
      this.spinner.show();
      this.userService.ValidLogin(this.LoginForm.value).subscribe(res => {
        setTimeout(() => this.spinner.hide(), 500);
        if (res.length > 0) {
          if (res[0].isAgent == 1) {
            this.toastr.error('You are an agent.');
            return;
          }
          if (res[0].statusId == 1) {
            this.toastr.error('Your login is pending. Please wait for approval');
            return;
          }
          else if (res[0].statusId == 3) {
            this.toastr.error('Your login approval is denied');
            return;
          }
          else if (res[0].statusId == 2) {
            sessionStorage.setItem('LoggedInUser', JSON.stringify(res));
            sessionStorage.setItem('Token', res[0].token);

            this._SharedDataService.AssignUser(res);
            this._SharedDataService.UserCart(res);
            this.router.navigate(['/home/fashion']);
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
          this.toastr.error('Invalid email address and password');
          return;
        }
      });
    }
  }
}
