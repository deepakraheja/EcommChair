import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public productSizeColor: productSizeColor[] = [];

  public checkoutForm: FormGroup;
  public products: Product[] = [];
  public payPalConfig?: IPayPalConfig;
  public payment: string = 'OnlinePayment';
  public amount: any;
  public Submitted: boolean = false;
  public lstBillingAddress: any[] = [];
  user: any[] = [];
  GST: any = 18;
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
  ) {
    this.user = JSON.parse(sessionStorage.getItem('LoggedInUser'));
    this.checkoutForm = this.fb.group({
      billingAddressId: [0],
      userID: this.user[0].userID,
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
      orderNumber: this._datePipe.transform(new Date().toString(), 'yyyyMMddHHmmss'),
      orderDate: this._datePipe.transform(new Date().toString(), 'yyyy-MM-dd HH:mm:ss'),
      paymentTypeId: [this.user[0].isVIPMember == true ? 3 : 1],
      subTotal: [0],
      tax: [18],
      shippingCharge: [0],
      totalAmount: [0],
      notes: [''],
      statusId: [0]
    })
  }

  // ngOnInit(): void {
  //   this.productService.cartItems.subscribe(response => this.products = response);
  //   this.getTotal.subscribe(amount => this.amount = amount);
  //   this.initConfig();
  // }


  ngOnInit(): void {
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

  LoadBillingAddress() {
    if (this.user != null) {
      let obj = {
        UserID: this.user[0].userID
      };
      this._billingAddressService.GetBillingAddress(obj).subscribe(res => {
        this.lstBillingAddress = res;
      });
    }
    else {
      this.lstBillingAddress = [];
    }
  }

  getTotal() {
    var TotalAmount = 0;
    this.productSizeColor.forEach(element => {
      TotalAmount += (element.salePrice * element.quantity) + element.gstAmount
    });
    return TotalAmount;
  }

  getTotalGSTAmount() {
    var TotalGSTAmount = 0;
    this.productSizeColor.forEach(element => {
      TotalGSTAmount += element.gstAmount
    });
    return TotalGSTAmount;
  }
  // public get getTotal(): Observable<number> {
  //   return this.productService.productcartTotalAmount();
  // }

  LoadCart() {
    this.user = JSON.parse(sessionStorage.getItem('LoggedInUser'));
    if (this.user != null) {
      let obj = {
        UserID: this.user[0].userID
      };
      this._cartService.GetCartProcessedById(obj).subscribe(response => {
        //  
        this.spinner.hide();
        this.productSizeColor = response
      });
    }
    else {
      this.productSizeColor = [];
    }

  }

  SelectBillingAddress(lst) {
    this.Submitted = false;
    this.checkoutForm = this.fb.group({
      billingAddressId: [lst.billingAddressId],
      userID: this.user[0].userID,
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
  }

  ProcessCheckOut() {
    this.Submitted = true;
    if (this.checkoutForm.invalid) {
      this.toastr.error("All fields are mandatory.");
      return;
    }
    else {
      this.spinner.show();
      let obj = {
        billingAddressId: Number(this.checkoutForm.value.billingAddressId),
        userID: Number(this.user[0].userID),
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
    }
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
