import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';
import { Product } from '../../../../shared/classes/product';
import { ProductService } from '../../../../shared/services/product.service';
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";
import { Productkart } from 'src/app/shared/classes/productkart';
import { ProductsService } from 'src/app/Service/Products.service';
import { environment } from 'src/environments/environment';
import { productSizeColor } from 'src/app/shared/classes/productsizecolor';
import { CartService } from 'src/app/Service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/pages/account/login/login.component';

declare var $;

export interface image {
  colorindex: number;
  color: string;
}

@Component({
  selector: 'app-product-left-sidebar-with-bundle',
  templateUrl: './product-left-sidebar-with-bundle.component.html',
  styleUrls: ['./product-left-sidebar-with-bundle.component.scss']
})
export class ProductLeftSidebarWithBundleComponent implements OnInit {


  //public headers: any = ["", "COLOR", "SIZE", "QUANTITY", "STOCK"];
  public headers: any = ["COLOR", "SIZE", "QUANTITY"];
  public ProductImage = environment.ProductImage;

  index: number;
  bigProductImageIndex = 0;

  public product: Product = {};

  public productkart: Productkart[] = [];

  public productSizeColor: productSizeColor[] = [];

  //public counter: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  public activeSlide: any = 0;

  activeSlide1: any = 0;
  public selectedSize: any;
  public mobileSidebar: boolean = false;
  public RowId: any;
  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;
  user: any[] = null;
  totalqty: any = 0;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private _prodService: ProductsService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
  ) {
    // this.route.data.subscribe(response => this.product = response.data );
  }
  BindProduct(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      const productid = params['productId'];
      this.RowId = params['productId'];
      const productSizeId = params['productSizeId'];

      let productObj = {
        rowID: productid,
        productSizeId: Number(productSizeId)
      }
      this._prodService.GetWithoutSetProductByRowID(productObj).subscribe(product => {
        if (!product) { // When product is empty redirect 404
          this.router.navigateByUrl('/pages/404', { skipLocationChange: true });
        } else {

          this.productkart = product;

        }
        setTimeout(() => this.spinner.hide(), 1000);
      });
    });

  }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
    this.BindProduct();
  }

  changecolor(index: string) {
    //  ;
    this.bigProductImageIndex = Number(index);
    this.activeSlide = Number(index);
  }


  // Get Product Color
  Color(variants) {

    if (variants != null) {

      const uniqColor = []

      let imageColor: image[] = []

      for (let i = 0; i < Object.keys(variants).length; i++) {
        if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
          uniqColor.push(variants[i].color)

          imageColor.push({
            colorindex: i,
            color: variants[i].color

          })
        }
      }

      //console.log(imageColor);
      return imageColor
    }
  }

  // Get Product Size  commented on 23 july 2020
  // Size(variants) {
  //   if (variants != null) {
  //     const uniqSize = []
  //     for (let i = 0; i < Object.keys(variants).length; i++) {
  //       if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
  //         uniqSize.push(variants[i].size)
  //       }
  //     }
  //     return uniqSize
  //   }
  // }

  fnCheck(item: productSizeColor, evt: any, rdoId: string) {
    //  ;
    item.isSelected = evt;
  }

  selectSize(size) {
    this.selectedSize = size;
  }

  // Increament
  increment(myIndex, item: productSizeColor, qty: any) {
    //  ;
    if (item.selectedQty < qty--)
      item.selectedQty++;

    //this.counter[myIndex]++;
  }

  // Decrement
  decrement(myIndex, item: productSizeColor) {
    if (item.selectedQty > 1) item.selectedQty--;
  }

  // Add to cart
  async addToCart(type: Number, minimum: Number) {
    //  
    //product.quantity = this.counter || 1;
    //product.productname = productname;
    // this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
    // //  
    // if (this.user == null || this.user == undefined) {
    //   //this.router.navigate(['/pages/login/cart']);
    //   this.modalService.open(LoginComponent, {
    //     size: 'lg',
    //     ariaLabelledBy: 'Cart-Modal',
    //     centered: true,
    //     windowClass: 'theme-modal cart-modal CartModal'
    //   });
    // }
    // else {
      this.totalqty = 0;
      var obj: any[] = [];
      var array: any[] = this.productkart[0].productSizeColor;
      (array).forEach(element => {

        if (element.isSelected) {

          obj.push({
            UserID: Number(this.user[0].userID),
            ProductSizeId: Number(element.productSizeId),
            Quantity: Number(element.selectedQty)
          })

          this.totalqty = this.totalqty + Number(element.selectedQty);

        }
      });
      ;
      if (Number(obj.length) == 0) {
        this.toastr.error("Please select atleast one item");
        return;
      }
      let productObj = {
        rowID: this.RowId,
        UserId: this.user[0].userID
      }
      debugger
      this._prodService.GetProductCartQuantity(productObj).subscribe(res => {
        debugger
        if (res.length > 0) {
          this.totalqty += res[0].qty
        }
        if (Number(this.totalqty) >= minimum) {
          const status = this.productService.addToCartProduct(obj);
          debugger
          if (status) {
            if (type == 1)
              this.router.navigate(['/shop/cart']);
            else
              this.router.navigate(['/shop/checkout']);
          }
        }
        else {

          this.toastr.error("Please select atleast " + minimum + " pieces.");
        }
      });
    //}

  }

  // Buy Now
  // async buyNow(product: any) {
  //   product.quantity = this.counter || 1;
  //   const status = await this.productService.addToCart(product);
  //   if (status)
  //     this.router.navigate(['/shop/checkout']);
  // }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  // Toggle Mobile Sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

}
