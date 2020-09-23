import { Component, OnInit, TemplateRef } from '@angular/core';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BillingAddressService } from 'src/app/Service/billing-address.service';
import { OrderService } from 'src/app/Service/order.service';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Service/users.service';
import { LookupService } from 'src/app/Service/lookup.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public ProductImage = environment.ProductImage;
  public openDashboard: boolean = false;
  public ShowTabName: string = "AccountInfor";
  public LoggedInUser: any[] = [];
  public lstBillingAddress: any[] = [];
  public lstOrder: any[] = [];
  public checkoutForm: FormGroup;
  public Submitted: boolean = false;
  public SelectedBillingAddressId: number = 0;
  public ChangePwdForm: FormGroup;
  public lstOrderStatus: any = [];
  constructor(
    private _SharedDataService: SharedDataService,
    private router: Router,
    private route: ActivatedRoute,
    private _BillingAddressService: BillingAddressService,
    private _OrderService: OrderService,
    public productService: ProductService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _userService: UsersService,
    public _lookupService: LookupService,
    private spinner: NgxSpinnerService,
  ) {

  }

  ngOnInit(): void {
    this._SharedDataService.currentUser.subscribe(a => {
      this.LoggedInUser = a;
      this.checkoutForm = this.fb.group({
        billingAddressId: [0],
        userID: this.LoggedInUser[0].userID,
        fName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
        lName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
        companyName: [''],
        phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        emailId: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required, Validators.maxLength(200)]],
        country: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
      });

      this.ChangePwdForm = this.fb.group({
        userID: this.LoggedInUser[0].userID,
        password: ['', [Validators.required]],
        NewPassword: ['', [Validators.required, Validators.minLength(8)]],
        ConfirmPwd: ['', [Validators.required, Validators.minLength(8)]],
      });

      this.LoadBillingAddress();
      this.LoadAllOrder();
      this.LoadOrderStatus();
    });
  }

  LoadOrderStatus() {
    this._lookupService.GetOrderStatus().subscribe(res => {
      this.lstOrderStatus = res;
    });
  }
  LoadBillingAddress() {
    let obj = {
      UserID: this.LoggedInUser[0].userID
    };
    this._BillingAddressService.GetBillingAddress(obj).subscribe(res => {
      this.lstBillingAddress = res;
    });
  }

  LoadAllOrder() {
    let obj = {
      UserID: this.LoggedInUser[0].userID
    };
    this.spinner.show();
    this._OrderService.GetOrderByUserId(obj).subscribe(res => {
      this.spinner.hide();
      this.lstOrder = res;
      //console.log(res);
      this.route.paramMap.subscribe((params: ParamMap) => {
        if (params.get('myorder') != null && params.get('myorder') != undefined) {
          this.ShowTabName = 'MyOrder';
        }
      });
    });
  }

  OrderTrackingListByOrderId(OrderId) {
    ////  
    let res = this.lstOrder[0].orderDetails;
    return res.filter(x => (x.orderId == null || x.orderId == OrderId));
  }

  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }

  Logout() {

    sessionStorage.removeItem('LoggedInUser');
    sessionStorage.removeItem('Token');
    this._SharedDataService.AssignUser(null);
    this.router.navigate(['/home/fashion']);
  }

  NewBillingAddress(template: TemplateRef<any>) {
    this.Submitted = false;
    this.checkoutForm = this.fb.group({
      billingAddressId: [0],
      userID: this.LoggedInUser[0].userID,
      fName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      companyName: [''],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      emailId: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
    this.modalService.open(template, {
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

  EditBillingAddress(template: TemplateRef<any>, lst) {
    this.Submitted = false;
    this.checkoutForm = this.fb.group({
      billingAddressId: [lst.billingAddressId],
      userID: this.LoggedInUser[0].userID,
      fName: [lst.fName, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lName: [lst.lName, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      companyName: [lst.companyName],
      phone: [lst.phone, [Validators.required, Validators.pattern('[0-9]+')]],
      emailId: [lst.emailId, [Validators.required, Validators.email]],
      address: [lst.address, [Validators.required, Validators.maxLength(200)]],
      country: [lst.country, Validators.required],
      city: [lst.city, Validators.required],
      state: [lst.state, Validators.required],
      zipCode: [lst.zipCode, Validators.required],
    });
    this.modalService.open(template, {
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

  DeleteBillingAddress(template: TemplateRef<any>, lst) {
    this.SelectedBillingAddressId = lst.billingAddressId;
    this.modalService.open(template, {
      size: 'md',
      //ariaLabelledBy: 'Cart-Modal',
      centered: true,
      //windowClass: 'theme-modal cart-modal CartModal'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.modalService.dismissAll();
    });
  }

  DelBillingAddress() {
    let obj = {
      billingAddressId: this.SelectedBillingAddressId,
      userID: Number(this.LoggedInUser[0].userID),
    }
    //  
    this.spinner.show();
    this._BillingAddressService.DeleteBillingAddress(obj).subscribe(res => {
      //  
      this.spinner.hide();
      this.lstBillingAddress = res;
      this.toastr.success("Billing Address has been deleted successfully.");
      this.modalService.dismissAll();
    });
  }

  SaveBillingAddress() {
    this.Submitted = true;
    if (this.checkoutForm.invalid) {
      this.toastr.error("All fields are mandatory.");
      return;
    }
    else {
      let obj = {
        billingAddressId: Number(this.checkoutForm.value.billingAddressId),
        userID: Number(this.LoggedInUser[0].userID),
        fName: this.checkoutForm.value.fName,
        lName: this.checkoutForm.value.lName,
        companyName: this.checkoutForm.value.companyName,
        phone: this.checkoutForm.value.phone,
        emailId: this.checkoutForm.value.emailId,
        address: this.checkoutForm.value.address,
        country: this.checkoutForm.value.country,
        city: this.checkoutForm.value.city,
        state: this.checkoutForm.value.state,
        zipCode: this.checkoutForm.value.zipCode,
      }
      //  
      this.spinner.show();
      this._BillingAddressService.SaveBillingAddress(obj).subscribe(res => {
        //  
        this.spinner.hide();
        this.lstBillingAddress = res;
        this.toastr.success("Billing Address has been saved successfully.");
        this.modalService.dismissAll();
        //this.LoadBillingAddress();
      });
    }
  }

  ChangePassword(template: TemplateRef<any>) {
    this.Submitted = false;
    this.ChangePwdForm = this.fb.group({
      userID: this.LoggedInUser[0].userID,
      password: ['', [Validators.required]],
      NewPassword: ['', [Validators.required, Validators.minLength(8)]],
      ConfirmPwd: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.modalService.open(template, {
      size: 'md',
      //ariaLabelledBy: 'Cart-Modal',
      centered: true,
      //windowClass: 'theme-modal cart-modal CartModal'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.modalService.dismissAll();
    });
  }

  UpdatePassword() {
    this.Submitted = true;
    if (this.ChangePwdForm.invalid) {
      this.toastr.error("All fields are mandatory.");
      return;
    }
    else {
      let obj = {
        userID: this.LoggedInUser[0].userID,
        password: this.ChangePwdForm.value.password,
        NewPassword: this.ChangePwdForm.value.NewPassword
      }
      this.spinner.show();
      this._userService.UpdatePwd(obj).subscribe(res => {
        this.spinner.hide();
        if (Number(res) > 0) {
          this.toastr.success("Password has been saved successfully.");
          this.modalService.dismissAll();
        }
        else
          this.toastr.error("Old Password is invalid.");
      });
    }
  }

  ShowDiv(id) {
    debugger
    if (document.getElementById(id).style.display == "block") {
      document.getElementById(id).style.display = "none";
      document.getElementById("btn" + id)['value'] = "Show";
    }
    else {
      document.getElementById(id).style.display = "block";
      document.getElementById("btn" + id)['value'] = "Hide";
    }
  }
}