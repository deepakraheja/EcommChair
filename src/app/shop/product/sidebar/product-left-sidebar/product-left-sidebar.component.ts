import { Component, OnInit, ViewChild, Renderer2, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider, ProductSlider } from '../../../../shared/data/slider';
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
import { DOCUMENT } from '@angular/common';

declare var $;
declare function imageZoom(a, b): any; // just change here from arun answer.

export interface image {
  colorindex: number;
  color: string;
  productSizeId: number;
}

// // Product Slider
// export let ProductSlider: any = {
//   loop: false,
//   dots: false,
//   navSpeed: 300,
//   navText: [ '<i class="fa-chevron-left"></i>', '<i class="fa-chevron-right></i>"' ],
//   responsive: {
//       991: {
//           items: 8
//       },
//       767: {
//           items: 8
//       },
//       420: {
//           items: 8
//       }, 
//       0: {
//           items: 8
//       }
//   }
// }


@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})


export class ProductLeftSidebarComponent implements OnInit {


  //public headers: any = ["", "COLOR", "SIZE", "QUANTITY", "STOCK"];
  public headers: any = ["COLOR", "QUANTITY"];
  public ProductImage = environment.ProductImage;

  index: number;
  bigProductImageIndex = 0;

  public product: Product = {};

  public productkart: any[] = [];

  public productSizeColor: productSizeColor[] = [];

  //public counter: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  public activeSlide: any = 0;

  activeSlide1: any = 0;
  public selectedSize: any;
  public mobileSidebar: boolean = false;
  public ProductSliderConfig: any = ProductSlider;
  public recentlyProduct: any[] = [];
  public RelatedProducts: any[] = [];
  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;
  user: any[] = null;
  SelectedColor: any[] = [];
  constructor(private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private _prodService: ProductsService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
  ) {
    this.activeSlide = 0;
    // this.route.data.subscribe(response => this.product = response.data );
  }

  ngAfterViewInit() {
    //setTimeout(() => imageZoom('zoom_01', 'myresult'), 2000);
    $(document).ready(function () {


      function scrollSticky() {
        if ($('.sticky-scroll').length) {

          var el = $('.sticky-scroll');
          var stickyTop = el.offset().top - 142;

          $(window).scroll(function () {

            var footerPosition = $('.unsticky').offset().top;
            var limit = footerPosition - 680 - 20;
            var windowTop = $(window).scrollTop();

            if (stickyTop < windowTop) {
              el.addClass('fixed-section');
              el.css({
                position: 'fixed',
                top: 142
              });
            } else {
              el.css('position', 'static');
              el.removeClass('fixed-section');
            }
            if (limit < windowTop) {
              var diff = limit - windowTop;
              el.css({
                top: diff + 142
              })
            }
          });
        }
      }
      if ($(window).width() >= 1024) {
        scrollSticky();
      }

      setTimeout(() => $("#zoom_01").ezPlus({
        zoomWindowWidth: 500,
        zoomWindowHeight: 500
      }), 3000);

    });
  }
  BindProduct(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      const productid = params['productId'];
      const productSizeId = params['productSizeId'];

      let productObj = {
        rowID: productid,
        productSizeId: Number(productSizeId)
      }
      this.SelectedColor = [];
      this.SelectedColor.push({
        productSizeId: Number(productSizeId)
      });
      this._prodService.GetWithoutSetProductByRowID(productObj).subscribe(product => {
        if (!product) { // When product is empty redirect 404
          this.router.navigateByUrl('/pages/404', { skipLocationChange: true });
        } else {

          this.productkart = product;
          this.recentlyProduct = product[0].userRecentlyProduct;
          this.RelatedProducts = product[0].relatedProduct;
          debugger
          //this.BindRelatedProductsByCategory(product[0].subcatecode);
        }
        setTimeout(() => this.spinner.hide(), 1000);
      });
    });

  }

  //Added on 08/07/2020
  BindRecentlyProduct() {
    this.spinner.show();
    this._prodService.GetUserRecentlyProduct().subscribe(res => {
      this.spinner.hide();
      this.recentlyProduct = res;
    });

  }

  //Added on 08/07/2020
  BindRelatedProductsByCategory(val) {
    let productObj = {
      Active: true,
      Subcatecode: val
    }
    this.spinner.show();
    this._prodService.getProductByCategory(productObj).subscribe(products => {
      this.spinner.hide();
      this.RelatedProducts = products;
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('LoggedInUser'));
    //this.BindRecentlyProduct();
    this.BindProduct();

    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://cdn.rawgit.com/igorlino/elevatezoom-plus/1.1.6/src/jquery.ez-plus.js';
    //s.text = `imageZoom("zoom_01", "myresult");`;
    this.renderer2.appendChild(this._document.body, s);
  }

  ChangeImage() {
    debugger;
    //this.activeSlide = index;
    setTimeout(() => $("#zoom_01").ezPlus(
      {

        zoomWindowWidth: 500,
        zoomWindowHeight: 500
      }
    ), 500);

    //  ;
    debugger
    // this.bigProductImageIndex = Number(index);
    // this.activeSlide = Number(index);
    // this.SelectedColor = [];
    // this.SelectedColor.push({
    //   productSizeId: Number(lst.productSizeId)
    // });
  }


  changecolor(lst, index: string) {
    //  ;
    debugger
    this.bigProductImageIndex = Number(index);
    this.activeSlide = Number(index);
    this.SelectedColor = [];
    this.SelectedColor.push({
      productSizeId: Number(lst.productSizeId)
    });
  }

  // Get Product Color
  Color(variants) {
    //debugger
    if (variants != null) {

      const uniqColor = []

      let imageColor: image[] = []
      //this.SelectedColor = [];
      for (let i = 0; i < Object.keys(variants).length; i++) {
        if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
          uniqColor.push(variants[i].color)

          imageColor.push({
            colorindex: i,
            color: variants[i].color,
            productSizeId: Number(variants[i].productSizeId)
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
  async addToCart(type: Number) {

    debugger;

    // setTimeout(function(){ 
    //   $("#zoom_01").css("display", "none");
    // }, 1000);


    //  
    //product.quantity = this.counter || 1;
    //product.productname = productname;
    this.user = JSON.parse(sessionStorage.getItem('LoggedInUser'));
    // //  
    if (this.user == null || this.user == undefined) {
      //this.router.navigate(['/pages/login/cart']);
      this.modalService.open(LoginComponent, {
        size: 'lg',
        ariaLabelledBy: 'Cart-Modal',
        centered: true,
        windowClass: 'theme-modal cart-modal CartModal'
      });
    }
    else {
      var obj: any[] = [];
      // var array: any[] = this.productkart[0].productSizeColor;
      // (array).forEach(element => {

      //   if (element.isSelected) {
      //     debugger
      //     obj.push({
      //       UserID: Number(this.user[0].userID),
      //       ProductSizeId: Number(element.productSizeId),
      //       Quantity: Number(element.selectedQty)
      //     })

      //   }
      // });
      //  ;
      debugger
      obj.push({
        UserID: Number(this.user[0].userID),
        ProductSizeId: Number(this.SelectedColor[0].productSizeId),
        Quantity: this.user[0].isPersonal == false ? (this.productkart[0].moq == 0 ? 1 : Number(this.productkart[0].moq)) : 1
      });

      //if (Number(obj.length) > 0) {
      const status = await this.productService.addToCartProduct(obj);

      if (status) {
        if (type == 1)
          this.router.navigate(['/shop/cart']);
        else
          this.router.navigate(['/shop/checkout']);
      }
      // }
      // else {

      //   this.toastr.error("Please select an item.");
      // }
      //}
    }
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
