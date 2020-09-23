import { Component, OnInit, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../classes/product";
import { productSizeColor } from '../../classes/productsizecolor';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/pages/account/login/login.component';
import { CartService } from 'src/app/Service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public ProductImage = environment.ProductImage;

  user: any[] = [];
  public products: Product[] = []
  public productSizeColor: productSizeColor[];

  public languages = [{
    name: 'English',
    code: 'en'
  }, {
    name: 'French',
    code: 'fr'
  }];

  public currencies = [
    {
      name: 'Rupees',
      currency: 'INR',
      price: 70.93 // price of inr
    }
    // , {
    //   name: 'Euro',
    //   currency: 'EUR',
    //   price: 0.90 // price of euro
    // }, {
    //   name: 'Pound',
    //   currency: 'GBP',
    //   price: 0.78 // price of euro
    // }, {
    //   name: 'Dollar',
    //   currency: 'USD',
    //   price: 1 // price of usd
    // }
  ]
  // constructor(@Inject(PLATFORM_ID) private platformId: Object,
  //   private translate: TranslateService,
  //   public productService: ProductService) {
  //   this.productService.cartItems.subscribe(response => this.products = response);
  // }


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public productService: ProductService,
    private router: Router,
    private _SharedDataService: SharedDataService,
    private modalPopUpService: NgbModal,
    private _cartService: CartService,
    private toastrService: ToastrService
  ) {
    //  


    // this.productService.ProductcartItems.subscribe(response => {
    //   this.productSizeColor = response
    //   //  ;
    // });
  }

  ngOnInit(): void {
    this._SharedDataService.lstCart.subscribe(res => {
      //  
      this.LoadCart();
    });
  }

  changeLanguage(code) {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code)
    }
  }
  getTotal() {
    var TotalAmount = 0;
    this.productSizeColor.forEach(element => {
      TotalAmount += element.salePrice
    });
    return TotalAmount;
  }

  // public get getTotal(): Observable<number> {
  //   return this.productService.productcartTotalAmount();
  // }

  LoadCart() {
    //  
    this.user = JSON.parse(sessionStorage.getItem('LoggedInUser'));
    if (this.user != null) {
      let obj = {
        UserID: this.user[0].userID
      };
      this._cartService.GetCartById(obj).subscribe(response => {
        //  
        this.productSizeColor = response;
      });
    }
    else {
      this.productSizeColor = [];
    }
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  changeCurrency(currency: any) {
    this.productService.Currency = currency
  }

  // ProceedToCheckout(val) {
  //   //  
  //   this._SharedDataService.currentUser.subscribe(res => {
  //     //  
  //     if (res == null || res == undefined) {
  //       //this.router.navigate(['/pages/login/cart']);

  //       this.modalPopUpService.open(LoginComponent, {
  //         size: 'lg',
  //         //ariaLabelledBy: 'Cart-Modal',
  //         centered: true,
  //         //windowClass: 'theme-modal cart-modal CartModal'
  //       }).result.then((result) => {
  //         `Result ${result}`
  //       }, (reason) => {
  //         this.modalPopUpService.dismissAll();
  //       });

  //     }
  //     else {
  //       if (res.length > 0) {
  //         this.router.navigate(['/shop/' + val]);
  //       }
  //       // else {
  //       //   this.modalPopUpService.open(LoginComponent, {
  //       //     size: 'lg',
  //       //     ariaLabelledBy: 'Cart-Modal',
  //       //     centered: true,
  //       //     windowClass: 'theme-modal cart-modal CartModal'
  //       //   });
  //       //   //this.router.navigate(['/pages/login/cart']);
  //       // }
  //     }
  //   });
  // }
}
