import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";
import { Productkart } from 'src/app/shared/classes/productkart';
import { environment } from 'src/environments/environment';
import { LoginComponent } from 'src/app/pages/account/login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  public ProductImage = environment.ProductImage;
  public currency: any = this.productService.Currency;
  public products: Productkart[] = [];
  public user: any[] = JSON.parse(localStorage.getItem('LoggedInUser'));
  public ImageSrc: string;
  constructor(private router: Router,
    public productService: ProductService,
    private modalService: NgbModal,
  ) {
    this.productService.compareItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
  }

  // async addToCart(product: any) {
  //   const status = await this.productService.addToCart(product);
  //   if (status) {
  //     this.router.navigate(['/shop/cart']);
  //   }
  // }

  // Add to cart
  async addToCart(productkart: any) {

    debugger;

    this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
    // //  
    if (this.user == null || this.user == undefined) {
      this.modalService.open(LoginComponent, {
        size: 'lg',
        ariaLabelledBy: 'Cart-Modal',
        centered: true,
        windowClass: 'theme-modal cart-modal CartModal'
      });
    }
    else {
      var obj: any[] = [];

      debugger
      obj.push({
        UserID: Number(this.user[0].userID),
        ProductSizeId: Number(productkart.productSizeId),
        Quantity: this.user[0].isPersonal == false ? (productkart.moq == 0 ? 1 : Number(productkart.moq)) : 1
      });

      //if (Number(obj.length) > 0) {
      const status = await this.productService.addToCartProduct(obj);

      if (status) {
        this.router.navigate(['/shop/cart']);
      }

    }
  }

  removeItem(product: any) {
    this.productService.removeCompareItem(product);
  }

}
