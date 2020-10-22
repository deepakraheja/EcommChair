import { Component, OnInit, TemplateRef } from '@angular/core';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/Service/Products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public headers: any = ["COLOR", "SIZE", "QUANTITY", "DELETE"];
  public products: Product[] = [];
  public lstCartProduct: any[] = [];
  public productSizeColor: productSizeColor[] = [];
  public IsEmptyCart = false;
  public ProductImage = environment.ProductImage;
  user: any[] = null;
  public TotalAmount = 0; TotalPieces = 0; Price = 0; Discount = 0;
  public SelectedProduct: any;
  //commented on 13 july 2020
  // constructor(public productService: ProductService) {
  //   this.productService.cartItems.subscribe(response => this.products = response);
  // }

  constructor(
    public productService: ProductService,
    private router: Router,
    private _SharedDataService: SharedDataService,
    private _cartService: CartService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private _productService: ProductsService
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
        debugger
        if (response.length == 0)
          this.IsEmptyCart = true;
        else
          this.IsEmptyCart = false;
        this.spinner.hide();
        this.productSizeColor = response;
        this.getTotal();

      });
    }
    else {
      this.IsEmptyCart = true;
      this.productSizeColor = [];
      this.getTotal();
    }

  }

  // Increament
  increment(product, qty = 1) {
    //  
    debugger
    let obj = [{
      UserID: Number(this.user[0].userID),
      ProductSizeId: Number(product.productSizeId),
      Quantity: qty,
      SetNo: Number(product.setNo),
      ProductId: Number(product.productId)
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
    debugger
    if (product.quantity > 1) {
      let obj = [{
        UserID: Number(this.user[0].userID),
        ProductSizeId: Number(product.productSizeId),
        Quantity: qty,
        SetNo: Number(product.setNo),
        ProductId: Number(product.productId)
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

  deleteConfirmation(template: TemplateRef<any>, lst) {
    this.SelectedProduct = lst;
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

  public removeItem() {
    this.productService.removeCartItem(this.SelectedProduct);
    this.modalService.dismissAll();
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
  close() {
    this.modalService.dismissAll();
  }
  UpdateCart(template: TemplateRef<any>, lst) {
    debugger
    let obj = {
      UserID: Number(this.user[0].userID),
      ProductID: Number(lst.productId)
    }
    this._productService.GetProductInCartById(obj).subscribe(res => {
      this.lstCartProduct = res;
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
    });

  }
  LoadCartProductData(productID) {
    let obj1 = {
      UserID: Number(this.user[0].userID),
      ProductID: Number(productID)
    }
    this._productService.GetProductInCartById(obj1).subscribe(res1 => {
      this.lstCartProduct = res1;
    });
  }

  // Increament
  Min_increment(product, qty = 1) {
    //  
    debugger
    let obj = [{
      UserID: Number(this.user[0].userID),
      ProductSizeId: Number(product.productSizeId),
      Quantity: qty,
      SetNo: Number(product.setNo)
    }];
    this.spinner.show();
    this._cartService.UpdateToCart(obj).subscribe(res => {
      this.toastrService.success("Product quantity has been successfully updated in cart.");
      debugger
      this.LoadCartProductData(product.productID);

      this.LoadCart();
      this._SharedDataService.UserCart(this.productSizeColor);
    });
    this.productService.updateCartQuantity(product, qty);
  }

  // Decrement
  Min_decrement(product, qty = -1) {
    //  
    debugger
    if (product.quantity > 1 && product.cartProductQty > product.minimum) {
      let obj = [{
        UserID: Number(this.user[0].userID),
        ProductSizeId: Number(product.productSizeId),
        Quantity: qty,
        SetNo: Number(product.setNo)
      }];
      this.spinner.show();
      this._cartService.UpdateToCart(obj).subscribe(res => {
        this.toastrService.success("Product quantity has been successfully updated in the cart.");
        this.LoadCartProductData(product.productID);
        this.LoadCart();
        this._SharedDataService.UserCart(this.productSizeColor);
      });
    }
    else {
      this.toastrService.error("Product should be atleast " + product.minimum + " pieces.");
    }
    this.productService.updateCartQuantity(product, qty);
  }
  public Min_removeItem(product: any) {
    if ((product.cartProductQty - product.quantity) >= product.minimum) {
      if (this.productService.removeCartItem(product)) {
        this.LoadCartProductData(product.productID);
      }
    }
    else {
      this.toastrService.error("Product should be atleast " + product.minimum + " pieces.");
    }
  }
}
