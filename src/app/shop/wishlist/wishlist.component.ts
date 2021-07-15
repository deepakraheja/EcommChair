import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";
import { WishListService } from 'src/app/Service/wish-list.service';
import { Productkart } from 'src/app/shared/classes/productkart';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from 'src/app/Service/shared-data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  public ProductImage = environment.ProductImage;
  public products: any[] = [];
  public LoggedInUser: any[] = [];
  public WishList: any[] = [];
  public ImageSrc: string;
  public currency: any = this.productService.Currency;
  constructor(private router: Router,
    public productService: ProductService,
    public _wishListService: WishListService,
    private spinner: NgxSpinnerService,
    private _SharedDataService: SharedDataService,
  ) {
    //this.productService.wishlistItems.subscribe(response => this.products = response);
    this.LoadWishList();
  }

  ngOnInit(): void {
    //this.LoadWishList();
    this._SharedDataService.lstwishList.subscribe(response => {
      debugger
      if (response != null)
        this.products = response;
    });
  }

  LoadWishList() {
    this.LoggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    if (this.LoggedInUser != null) {
      this._wishListService.GetWishListById().subscribe(response => {
        this.products = response;
      });
    }
    else {
      this.products = [];
    }
  }

  async addToCart(product: any) {
    const status = await this.productService.addToWishToCartProduct(product);
    if (status) {
      this.router.navigate(['/shop/cart']);
      this.removeItem(product);
    }
  }

  removeItem(product: any) {
    this.productService.removeWishlistItem(product)
    // if (this.productService.removeWishlistItem(product))
    //   this.LoadWishList();
  }

  GoToDetail(rowID, productSizeColorId, setType, setNo) {
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
