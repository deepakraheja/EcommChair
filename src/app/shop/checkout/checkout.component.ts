import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
//import { OrderService } from "../../shared/services/order.service";
import { productSizeColor } from 'src/app/shared/classes/productsizecolor';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Service/cart.service';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { DatePipe } from '@angular/common';
import { BillingAddressService } from 'src/app/Service/billing-address.service';
import { OrderService } from 'src/app/Service/order.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/Service/users.service';
declare var $;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public productSizeColor: any[] = [];
  public ProductImage = environment.ProductImage;
  public checkoutForm: FormGroup;
  public businessForm: FormGroup;
  public products: Product[] = [];
  public payPalConfig?: IPayPalConfig;
  public payment: string = 'OnlinePayment';
  public amount: any;
  public Submitted: boolean = false;
  public lstBillingAddress: any[] = [];
  user: any[] = [];
  GST: any = 18;
  AddressId: any;
  SelectedAddress: any;

  Address1: boolean = true;
  Address2: boolean = false;

  OrderSummary1: boolean = true;
  OrderSummary2: boolean = false;

  PaymentOption1: boolean = true;
  PaymentOption2: boolean = false;

  fafaCheck: boolean = false;

  btnContinue: boolean = false;

  addnewaddress: boolean = true;
  addaddress: boolean = false;
  email: any;
  PinCodeMask: string;
  IsEmptyCart: boolean = false;
  AadharNumberMask: string;
  PhoneMask = null;
  showMask: boolean = false;
  constructor(private fb: FormBuilder,
    public productService: ProductService,
    //private orderService: OrderService,
    private toastr: ToastrService,
    private _SharedDataService: SharedDataService,
    private _cartService: CartService,
    private _datePipe: DatePipe,
    private _billingAddressService: BillingAddressService,
    private _orderService: OrderService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private _userService: UsersService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('LoggedInUser'));
    this.email = this.user[0].email;
    this.checkoutForm = this.fb.group({
      billingAddressId: [0],
      userID: this.user[0].userID,
      fName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      //lName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      companyName: [''],
      //phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      //emailId: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      country: ['India', Validators.required],
      city: ['', Validators.required],
      state: [''],
      zipCode: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(6)]],
      orderNumber: this._datePipe.transform(new Date().toString(), 'yyyyMMddHHmmss'),
      orderDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
      paymentTypeId: [this.user[0].isVIPMember == true ? 3 : 1],
      subTotal: [0],
      tax: [18],
      shippingCharge: [0],
      totalAmount: [0],
      notes: [''],
      statusId: [0],
      businessLicenseType: ['GSTIN'],
      businessLicenseNo: [''],
    });
    this.businessForm = this.fb.group({
      BusinessType: ['', Validators.required],
      Industry: ['', Validators.required],
      businessLicenseType: ['GSTIN', Validators.required],
      GSTNo: ['', Validators.required],
      PANNo: ['', Validators.required],
      AadharCard: ['', Validators.required],
      BusinessName: ['', Validators.required],
      BusinessPhone: ['', Validators.required]
    });

  }

  // ngOnInit(): void {
  //   this.productService.cartItems.subscribe(response => this.products = response);
  //   this.getTotal.subscribe(amount => this.amount = amount);
  //   this.initConfig();
  // }

  EditBillingAddress(template: TemplateRef<any>, lst) {
    this.Submitted = false;
    this.checkoutForm = this.fb.group({
      billingAddressId: [lst.billingAddressId],
      userID: Number(this.user[0].userID),
      fName: [lst.fName, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      //lName: [lst.lName, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      companyName: [lst.companyName],
      // phone: [lst.phone, [Validators.required, Validators.pattern('[0-9]+')]],
      // emailId: [lst.emailId, [Validators.required, Validators.email]],
      address: [lst.address, [Validators.required, Validators.maxLength(200)]],
      country: [lst.country, Validators.required],
      city: [lst.city, Validators.required],
      state: [lst.state],
      zipCode: [lst.zipCode, Validators.required, Validators.minLength(6)],
      businessLicenseType: [lst.businessLicenseType],
      businessLicenseNo: [lst.businessLicenseNo],
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

  SaveBillingAddress() {
    if (this.user[0].isPersonal == false) {
      this.BusinessLicenseValidation();
    }
    this.Submitted = true;
    if (this.checkoutForm.invalid) {
      this.toastr.error("All * fields are mandatory.");
      return;
    }
    else {
      let obj = {
        billingAddressId: Number(this.checkoutForm.value.billingAddressId),
        userID: Number(this.user[0].userID),
        fName: this.checkoutForm.value.fName,
        //lName: this.checkoutForm.value.lName,
        companyName: this.checkoutForm.value.companyName,
        // phone: this.checkoutForm.value.phone,
        // emailId: this.checkoutForm.value.emailId,
        address: this.checkoutForm.value.address,
        country: this.checkoutForm.value.country,
        city: this.checkoutForm.value.city,
        state: this.checkoutForm.value.state,
        zipCode: this.checkoutForm.value.zipCode,
        businessLicenseType: this.checkoutForm.value.businessLicenseType,
        businessLicenseNo: this.checkoutForm.value.businessLicenseNo,
      }
      //  
      this.spinner.show();
      this._billingAddressService.SaveBillingAddress(obj).subscribe(res => {
        //  
        this.spinner.hide();
        this.lstBillingAddress = res;
        this.toastr.success("Billing Address has been saved successfully.");
        this.modalService.dismissAll();
        //this.LoadBillingAddress();
      });
    }
  }

  addPinCodeMask(obj: Object) {
    this.PinCodeMask = "000000";
  }

  ngOnInit(): void {
    setTimeout(function () {
      $.removeData($('img'), 'elevateZoom');
      $('.zoomContainer').remove();
    }, 200);

    this.spinner.show();
    this._SharedDataService.lstCart.subscribe(res => {
      this.LoadCart();
      this.LoadBillingAddress();
    });

    // this.productService.ProductcartItems.subscribe(response => {
    //   this.productSizeColor = response
    //   //  ;
    // });

    // this.getTotal.subscribe(amount => {
    //   this.amount = amount
    // });
    //this.initConfig();
  }
  onItemChange(item) {
    debugger
    //alert(item.billingAddressId)

    this.AddressId = item.billingAddressId
    this.SelectedAddress = item.address + ' ' + item.city + ' ' + item.state + ' ' + item.zipCode + ' ' + item.country

  }

  LoadBillingAddress() {
    if (this.user != null) {
      let obj = {
        UserID: this.user[0].userID
      };
      this._billingAddressService.GetBillingAddress(obj).subscribe(res => {
        this.lstBillingAddress = res;
        if (this.lstBillingAddress.length == 0) {
          this.AddNewAddress();
        }
        this.AddressId = res[0].billingAddressId;
        this.email = res[0].emailId;
        this.SelectedAddress = res[0].address + ' ' + res[0].city + ' ' + res[0].state + ' ' + res[0].zipCode + ' ' + res[0].country
      });
    }
    else {
      this.lstBillingAddress = [];
    }
  }

  getTotal() {
    var TotalAmount = 0;
    this.productSizeColor.forEach(element => {
      TotalAmount += Number(((element.salePrice * element.quantity) - element.additionalDiscountAmount + element.gstAmount).toFixed(2));
    });
    return TotalAmount;
  }

  getTotalQty() {
    var TotalQty = 0;
    this.productSizeColor.forEach(element => {
      TotalQty += Number((element.quantity).toFixed(2));
    });
    return TotalQty;
  }

  getTotalAdditionalDiscountAmount() {
    var TotalAdditionalDiscountAmount = 0;
    this.productSizeColor.forEach(element => {
      TotalAdditionalDiscountAmount += Number((element.additionalDiscountAmount).toFixed(2));
    });
    return TotalAdditionalDiscountAmount;
  }

  getTotalAmountWithDis() {
    var TotalAmount = 0;
    this.productSizeColor.forEach(element => {
      TotalAmount += Number(((element.salePrice * element.quantity) - element.additionalDiscountAmount).toFixed(2));
    });
    return TotalAmount;
  }

  getTotalGSTAmount() {
    var TotalGSTAmount = 0;
    this.productSizeColor.forEach(element => {
      TotalGSTAmount += Number((element.gstAmount).toFixed(2));
    });
    return TotalGSTAmount;
  }
  // public get getTotal(): Observable<number> {
  //   return this.productService.productcartTotalAmount();
  // }

  LoadCart() {
    this.user = JSON.parse(sessionStorage.getItem('LoggedInUser'));
    if (this.user != null) {
      // let obj = {
      //   UserID: this.user[0].userID
      // };
      this._cartService.GetCartProcessedById().subscribe(response => {
        //  
        if (response.length > 0) {
          this.IsEmptyCart = false;
          this.spinner.hide();
          this.productSizeColor = response;
        }
        else {
          this.IsEmptyCart = true;
          this.productSizeColor = [];
        }
      });
    }
    else {
      this.productSizeColor = [];
    }

  }
  ChangeAddress() {
    this.Address1 = true;
    this.Address2 = false;
    this.addnewaddress = true;

    this.OrderSummary1 = true;
    this.OrderSummary2 = false;

    this.fafaCheck = false;

    this.PaymentOption1 = true;
    this.PaymentOption2 = false;

    this.btnContinue = false;


  }

  cancel() {
    this.addnewaddress = true;
    this.addaddress = false;
  }

  Continue() {
    debugger

    this.OrderSummary1 = true;
    this.OrderSummary2 = false;
    this.fafaCheck = true;

    this.btnContinue = false;

    this.PaymentOption1 = false;
    this.PaymentOption2 = true;
    

    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }

  }

  AddNewAddress() {
    this.addnewaddress = false;
    this.addaddress = true;

    this.btnContinue = false;
    this.checkoutForm = this.fb.group({
      billingAddressId: [0],
      userID: this.user[0].userID,
      fName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      //lName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      companyName: [''],
      //phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      //emailId: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      country: ['India', Validators.required],
      city: ['', Validators.required],
      state: [''],
      zipCode: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(6)]],
      orderNumber: this._datePipe.transform(new Date().toString(), 'yyyyMMddHHmmss'),
      orderDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
      paymentTypeId: [this.user[0].isVIPMember == true ? 3 : 1],
      subTotal: [0],
      tax: [18],
      shippingCharge: [0],
      totalAmount: [0],
      notes: [''],
      statusId: [0],
      businessLicenseType: ['GSTIN'],
      businessLicenseNo: [''],
    });

  }

  addAadharMask(obj: object) {
    this.AadharNumberMask = "0000 0000 0000";
    this.showMask = false;
  }


  addPhoneMask(obj: Object) {
    this.PhoneMask = "0000000000";
    this.showMask = false;
  }

  ChangeLicenseType() {
    const gstNo = this.checkoutForm.get('GSTNo');
    const panNo = this.checkoutForm.get('PANNo');
    const AadharCard = this.checkoutForm.get('AadharCard');

    gstNo.reset();
    panNo.reset();
    AadharCard.reset();
  }

  BusinessLicenseValidation() {
    const businessLicenseType = this.checkoutForm.get('businessLicenseType');
    const businessLicenseNo = this.checkoutForm.get('businessLicenseNo');
    const companyName = this.checkoutForm.get('companyName');

    businessLicenseType.setValidators([Validators.required]);
    businessLicenseNo.setValidators([Validators.required, Validators.minLength(12)]);
    companyName.setValidators([Validators.required]);
    businessLicenseType.updateValueAndValidity();
    businessLicenseNo.updateValueAndValidity();
    companyName.updateValueAndValidity();
  }

  get f() { return this.businessForm.controls; }

  SelectdeliverAddress(template: TemplateRef<any>, lst) {
    debugger
    // if (this.user[0].isPersonal == false) {
    //   this._userService.GetUserInfo().subscribe(res => {
    //     if (res[0].isPersonal == false && (res[0].businessLicenseType == '' || res[0].businessLicenseType == null)) {
    //       this.Submitted = false;
    //       this.businessForm = this.fb.group({
    //         BusinessType: ['', Validators.required],
    //         Industry: ['', Validators.required],
    //         businessLicenseType: ['', Validators.required],
    //         GSTNo: ['', Validators.required],
    //         PANNo: ['', Validators.required],
    //         AadharCard: ['', Validators.required],
    //         BusinessName: ['', Validators.required],
    //         BusinessPhone: ['', Validators.required]
    //       });

    //       this.modalService.open(template, {
    //         size: 'lg',
    //         //ariaLabelledBy: 'Cart-Modal',
    //         centered: true,
    //         //windowClass: 'theme-modal cart-modal CartModal'
    //       }).result.then((result) => {
    //         `Result ${result}`
    //       }, (reason) => {
    //         this.modalService.dismissAll();
    //       });
    //       return;
    //     }
    //     else {
    //       this.Address1 = false;
    //       this.Address2 = true;
    //       this.addnewaddress = false;
    //       this.addaddress = false;
    //       this.Submitted = false;
    //       this.OrderSummary1 = false;
    //       this.OrderSummary2 = true;
    //       this.btnContinue = true;

    //       const billingAddressId = this.checkoutForm.get('billingAddressId');
    //       billingAddressId.setValue(lst.billingAddressId);
    //       billingAddressId.updateValueAndValidity();
    //     }
    //   });
    // }
    // else {
    this.Address1 = false;
    this.Address2 = true;
    this.addnewaddress = false;
    this.addaddress = false;
    this.Submitted = false;
    this.OrderSummary1 = false;
    this.OrderSummary2 = true;
    this.btnContinue = true;

    const billingAddressId = this.checkoutForm.get('billingAddressId');
    billingAddressId.setValue(lst.billingAddressId);
    billingAddressId.updateValueAndValidity();
    //}



    /* this.checkoutForm = this.fb.group({
       billingAddressId: [lst.billingAddressId],
       userID: this.user[0].userID,
       fName: [lst.fName, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
       //lName: [lst.lName, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
       companyName: [lst.companyName],
       phone: [lst.phone, [Validators.required, Validators.pattern('[0-9]+')]],
       emailId: [lst.emailId, [Validators.required, Validators.email]],
       address: [lst.address, [Validators.required, Validators.maxLength(200)]],
       country: [lst.country, Validators.required],
       city: [lst.city, Validators.required],
       state: [lst.state, Validators.required],
       zipCode: [lst.zipCode, Validators.required],
       
       orderNumber: this._datePipe.transform(new Date().toString(), 'yyyyMMddHHmmss'),
       orderDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
       paymentTypeId: Number(this.checkoutForm.value.paymentTypeId),
       subTotal: Number(this.getTotal()),
       tax: 0,
       shippingCharge: 0,
       totalAmount: Number(this.getTotal()) + Number(this.checkoutForm.value.shippingCharge),
       notes: '',
       statusId: 1
     });
     */
  }

  ShowOrder() {

    this.OrderSummary1 = false;
    this.OrderSummary2 = true;

    this.btnContinue = true;

    this.PaymentOption2 = false;

    this.PaymentOption1 = true;
  }


  SaveAddress() {
    if (this.user[0].isPersonal == false) {
      this.BusinessLicenseValidation();
    }
    this.Submitted = true;
    if (this.checkoutForm.invalid) {
      this.toastr.error("All * fields are mandatory.");
      return;
    }
    else {
      this.spinner.show();
      let obj = {
        //billingAddressId: Number(this.checkoutForm.value.billingAddressId),
        userID: Number(this.user[0].userID),
        fName: this.checkoutForm.value.fName,
        //lName: this.checkoutForm.value.lName,
        companyName: this.checkoutForm.value.companyName,
        //phone: this.checkoutForm.value.phone,
        //emailId: this.checkoutForm.value.emailId,
        address: this.checkoutForm.value.address,
        country: this.checkoutForm.value.country,
        city: this.checkoutForm.value.city,
        state: this.checkoutForm.value.state,
        zipCode: this.checkoutForm.value.zipCode,
        businessLicenseType: this.checkoutForm.value.businessLicenseType,
        businessLicenseNo: this.checkoutForm.value.businessLicenseNo,
        //orderNumber: this._datePipe.transform(new Date().toString(), 'yyyyMMddHHmmss'),
        //orderDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
        //paymentTypeId: Number(this.checkoutForm.value.paymentTypeId),
        //subTotal: Number(this.getTotal()),
        //tax: 0,
        //shippingCharge: 0,
        //totalAmount: Number(this.getTotal()) + Number(this.checkoutForm.value.shippingCharge),
        //notes: '',
        //statusId: 1
      }

      this._billingAddressService.SaveBillingAddress(obj).subscribe(res => {
        //  
        this.spinner.hide();
        this.lstBillingAddress = res;
        this.toastr.success("Delivery Address has been saved successfully!");
        this.cancel();
        debugger
        this.AddressId = this.lstBillingAddress[this.lstBillingAddress.length - 1].billingAddressId;

        //this.LoadBillingAddress();
      });
      //  
      // this._orderService.SaveOrder(obj).subscribe(res => {
      //   //  
      //   this.spinner.hide();
      //   this._SharedDataService.UserCart([]);
      //   this.router.navigate(['/shop/checkout/success/' + res]);
      // });
    }
  }

  formControlValueChanged() {

    const businessLicenseType = this.businessForm.get('businessLicenseType');
    const gstNo = this.businessForm.get('GSTNo');
    const panNo = this.businessForm.get('PANNo');
    const AadharCard = this.businessForm.get('AadharCard');

    if (businessLicenseType.value == 'GSTIN') {
      gstNo.setValidators([Validators.required]);

      panNo.clearValidators();
      AadharCard.clearValidators();

      gstNo.updateValueAndValidity();
      panNo.updateValueAndValidity();
      AadharCard.updateValueAndValidity();
    }
    else if (businessLicenseType.value == 'BusinessPAN') {

      panNo.setValidators([Validators.required]);

      gstNo.clearValidators();
      AadharCard.clearValidators();

      gstNo.updateValueAndValidity();
      panNo.updateValueAndValidity();
      AadharCard.updateValueAndValidity();
    }
    else if (businessLicenseType.value == 'AadharCard') {

      AadharCard.setValidators([Validators.required]);

      panNo.clearValidators();
      gstNo.clearValidators();

      AadharCard.updateValueAndValidity();
      gstNo.updateValueAndValidity();
      panNo.updateValueAndValidity();
    }
  }

  SaveBusinessDetail() {
    this.formControlValueChanged();
    this.Submitted = true;
    if (this.businessForm.invalid) {
      this.toastr.error("All * fields are mandatory.");
      return;
    }
    else {
      this.spinner.show();
      this._userService.UpdateUserBusinessDetail(this.businessForm.value).subscribe(res => {
        this.spinner.hide();
        //this.lstBillingAddress = res;
        this.toastr.success("Business detail has been saved successfully!");
        this.modalService.dismissAll();
        debugger
        //this.AddressId = this.lstBillingAddress[this.lstBillingAddress.length - 1].billingAddressId;
      });
    }
  }

  ProcessCheckOut() {
    // this.Submitted = true;
    // if (this.checkoutForm.invalid) {
    //   this.toastr.error("All * fields are mandatory.");
    //   return;
    // }
    // else {
    this.spinner.show();
    debugger
    let obj = {
      billingAddressId: Number(this.checkoutForm.value.billingAddressId),
      //userID: Number(this.user[0].userID),
      //fName: this.checkoutForm.value.fName,
      //lName: this.checkoutForm.value.lName,
      //companyName: this.checkoutForm.value.companyName,
      //phone: this.checkoutForm.value.phone,
      //emailId: this.checkoutForm.value.emailId,
      //address: this.checkoutForm.value.address,
      //country: this.checkoutForm.value.country,
      //city: this.checkoutForm.value.city,
      //state: this.checkoutForm.value.state,
      //zipCode: this.checkoutForm.value.zipCode,
      orderNumber: this._datePipe.transform(new Date().toString(), 'yyyyMMddHHmmss'),
      orderDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
      paymentTypeId: Number(this.checkoutForm.value.paymentTypeId),
      subTotal: Number(this.getTotal()),
      tax: 0,
      shippingCharge: 0,
      totalAmount: Number(this.getTotal()) + Number(this.checkoutForm.value.shippingCharge),
      notes: '',
      statusId: 1
    }
    //  
    this._orderService.SaveOrder(obj).subscribe(res => {
      //  
      this.spinner.hide();
      this._SharedDataService.UserCart([]);
      this.router.navigate(['/shop/checkout/success/' + res]);

    });
    //}
  }

  // // Stripe Payment Gateway
  // stripeCheckout() {
  //   var handler = (<any>window).StripeCheckout.configure({
  //     key: environment.stripe_token, // publishble key
  //     locale: 'auto',
  //     token: (token: any) => {
  //       // You can access the token ID with `token.id`.
  //       // Get the token ID to your server-side code for use.
  //       this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.amount);
  //     }
  //   });
  //   handler.open({
  //     name: 'Multikart',
  //     description: 'Online Fashion Store',
  //     amount: this.amount * 100
  //   })
  // }

  // // Paypal Payment Gateway
  // private initConfig(): void {
  //   this.payPalConfig = {
  //     currency: this.productService.Currency.currency,
  //     clientId: environment.paypal_token,
  //     createOrderOnClient: (data) => <ICreateOrderRequest>{
  //       intent: 'CAPTURE',
  //       purchase_units: [{
  //         amount: {
  //           currency_code: this.productService.Currency.currency,
  //           value: this.amount,
  //           breakdown: {
  //             item_total: {
  //               currency_code: this.productService.Currency.currency,
  //               value: this.amount
  //             }
  //           }
  //         }
  //       }]
  //     },
  //     advanced: {
  //       commit: 'true'
  //     },
  //     style: {
  //       label: 'paypal',
  //       size: 'small', // small | medium | large | responsive
  //       shape: 'rect', // pill | rect
  //     },
  //     onApprove: (data, actions) => {
  //       this.orderService.createOrder(this.products, this.checkoutForm.value, data.orderID, this.getTotal);
  //       console.log('onApprove - transaction was approved, but not authorized', data, actions);
  //       actions.order.get().then(details => {
  //         console.log('onApprove - you can get full order details inside onApprove: ', details);
  //       });
  //     },
  //     onClientAuthorization: (data) => {
  //       console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
  //     },
  //     onCancel: (data, actions) => {
  //       console.log('OnCancel', data, actions);
  //     },
  //     onError: err => {
  //       console.log('OnError', err);
  //     },
  //     onClick: (data, actions) => {
  //       console.log('onClick', data, actions);
  //     }
  //   };
  // }

}
