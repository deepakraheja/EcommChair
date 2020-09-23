import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";
import { Productkart } from 'src/app/shared/classes/productkart';
import { productSizeColor } from 'src/app/shared/classes/productsizecolor';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { CartService } from 'src/app/Service/cart.service';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: Product[] = [];

  public productSizeColor: productSizeColor[] = [];

  public ProductImage = environment.ProductImage;
  user: any[] = null;
  public TotalAmount = 0; TotalPieces = 0; Price = 0; Discount = 0;
  //commented on 13 july 2020
  // constructor(public productService: ProductService) {
  //   this.productService.cartItems.subscribe(response => this.products = response);
  // }

  constructor(public productService: ProductService,
    private router: Router,
    private _SharedDataService: SharedDataService,
    private _cartService: CartService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
  ) {

    // this.productService.ProductcartItems.subscribe(response => {
    //   this.productSizeColor = response
    //   //  ;
    // });
  }

  ngOnInit(): void {
    this._SharedDataService.lstCart.subscribe(res => {
      this.LoadCart();
    });
  }

  getTotal() {
    this.TotalAmount = 0;
    this.TotalPieces = 0;
    this.Price = 0;
    this.Discount = 0;
    this.productSizeColor.forEach(element => {
      this.TotalPieces += element.totalPieces;
      if (element.setType != 3) {
        this.Price += element.price * element.totalPieces;
      }
      else {
        this.Price += element.price;
      }

      //this.TotalAmount += element.salePrice;
      this.Discount += element.discount
    });
    //return TotalAmount;
  }
  ColorSize(product) {

    var arr = product.split('|');
    return arr;
  }
  // getTotalPcs() {
  //   var TotalPieces = 0;
  //   this.productSizeColor.forEach(element => {
  //     TotalPieces += element.totalPieces
  //   });
  //   return TotalPieces;
  // }

  // getTotalAmount() {
  //   var Price = 0;
  //   this.productSizeColor.forEach(element => {
  //     Price += element.price
  //   });
  //   return Price;
  // }

  // getTotalDiscount() {
  //   var Discount = 0;
  //   this.productSizeColor.forEach(element => {
  //     Discount += element.discount
  //   });
  //   return Discount;
  // }
  // public get getTotal(): Observable<number> {
  //   return this.productService.productcartTotalAmount();
  // }

  LoadCart() {
    this.user = JSON.parse(sessionStorage.getItem('LoggedInUser'));
    if (this.user != null) {
      let obj = {
        UserID: this.user[0].userID
      };
      this.spinner.show();
      this._cartService.GetCartById(obj).subscribe(response => {
        //  
        this.spinner.hide();
        this.productSizeColor = response;
        this.getTotal();
      });
    }
    else {
      this.productSizeColor = [];
      this.getTotal();
    }

  }

  // Increament
  increment(product, qty = 1) {
    //  
    let obj = [{
      UserID: Number(this.user[0].userID),
      ProductSizeId: Number(product.productSizeId),
      Quantity: qty,
      SetNo: Number(product.setNo)
    }];
    this.spinner.show();
    this._cartService.UpdateToCart(obj).subscribe(res => {
      this.toastrService.success("Product quantity has been successfully updated in cart.");
      this.LoadCart();
      this._SharedDataService.UserCart(this.productSizeColor);
    });
    this.productService.updateCartQuantity(product, qty);
  }

  // Decrement
  decrement(product, qty = -1) {
    //  
    if (product.quantity > 1) {
      let obj = [{
        UserID: Number(this.user[0].userID),
        ProductSizeId: Number(product.productSizeId),
        Quantity: qty,
        SetNo: Number(product.setNo)
      }];
      this.spinner.show();
      this._cartService.UpdateToCart(obj).subscribe(res => {
        this.toastrService.success("Product quantity has been successfully updated in cart.");
        this.LoadCart();
        this._SharedDataService.UserCart(this.productSizeColor);
      });
    }
    this.productService.updateCartQuantity(product, qty);
  }

  public removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  ProceedToCheckout() {
    //  
    this.router.navigate(['/shop/checkout']);

    // this._SharedDataService.currentUser.subscribe(res => {
    //   //  
    //   if (res == null || res == undefined) {
    //     this.router.navigate(['/pages/login/cart']);
    //   }
    //   else {
    //     if (res.length > 0) {
    //       this.router.navigate(['/shop/checkout']);
    //     }
    //     else {
    //       this.router.navigate(['/pages/login/cart']);
    //     }
    //   }
    // });
  }

  GoToDetail(rowID, productSizeColorId, setType, setNo) {
    this.user = JSON.parse(sessionStorage.getItem('LoggedInUser'));
    //  
    this.spinner.show();
    if (setType == 1) {
      this.router.navigateByUrl('/shop/product/left/sidebar/' + rowID + '/' + productSizeColorId);
      this.spinner.hide();
    }
    else if (setType == 2) {
      this.router.navigateByUrl('/shop/product/left/sidebarwithset/' + rowID + '/' + setNo);
      this.spinner.hide();
    }
    if (setType == 3) {
      this.router.navigateByUrl('/shop/product/left/sidebarwithbundle/' + rowID + '/' + productSizeColorId);
      this.spinner.hide();
    }

  }
}
