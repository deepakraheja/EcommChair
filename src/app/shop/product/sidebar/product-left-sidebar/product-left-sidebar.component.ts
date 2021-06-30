import { Component, OnInit, ViewChild, Renderer2, Inject, ViewChildren, QueryList, ElementRef } from '@angular/core';
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

  public updatedPrice = 0;
  public updatedPrice6 = 0;
  public updatedPrice2 = 0;
  public updatedPrice3 = 0;
  public updatedPrice4 = 0;
  public updatedPrice5 = 0;
  //public accessorysummary: string = "";

  //public headers: any = ["", "COLOR", "SIZE", "QUANTITY", "STOCK"];
  public headers: any = ["COLOR", "QUANTITY"];
  public ProductImage = environment.ProductImage;
  public AccessoryImage = environment.AccessoryImage;
  selectedCheckIn: string;
  index: number;
  bigProductImageIndex = 0;

  public product: Product = {};

  public productkart: any[] = [];


  public accessorysummary: any[] = [];


  public accessorysummary2: any[] = [];
  public accessorysummary3: any[] = [];
  public accessorysummary4: any[] = [];
  public accessorysummary5: any[] = [];
  public accessorysummary6: any[] = [];
  public accessorysummary7: any[] = [];

  public AccessoryCategory: any[] = [];

  public AccessoryCategory1: any[] = [];
  public AccessoryCategory2: any[] = [];
  public AccessoryCategory3: any[] = [];
  public AccessoryCategory4: any[] = [];
  public AccessoryCategory5: any[] = [];
  public AccessoryCategory6: any[] = [];



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

  @ViewChildren("checkboxes1") checkboxes1: QueryList<ElementRef>;
  @ViewChildren("checkboxes2") checkboxes2: QueryList<ElementRef>;
  @ViewChildren("checkboxes3") checkboxes3: QueryList<ElementRef>;
  @ViewChildren("checkboxes4") checkboxes4: QueryList<ElementRef>;
  @ViewChildren("checkboxes5") checkboxes5: QueryList<ElementRef>;
  @ViewChildren("checkboxes6") checkboxes6: QueryList<ElementRef>;


  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;
  user: any[] = null;

  SelectedColor: any[] = [];
  public accessoryId = null;
  businessPrice: any = 0;
  productid: any;
  IsShowReviews=0;

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
    this.BindAccessory();
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

      setTimeout(() => $("#Zoom-10").ezPlus({
        zoomWindowWidth: 300,
        zoomWindowHeight: 300
      }), 3000);

    });
  }


  BindAccessory(): void {
    this.route.params.subscribe(params => {
      const productid = params['productId'];
      this.productid = params['productId'];
      let productObj = {
        rowID: productid,

      }
      debugger

      this._prodService.GetAccessoryByproductId(productObj).subscribe(res => {
        if (!res) { // When product is empty redirect 404
          this.router.navigateByUrl('/pages/404', { skipLocationChange: true });
        } else {
          debugger
          this.AccessoryCategory = res;
          this.AccessoryCategory1 = res.filter(val => val.accessoryCategoryId == 1);
          this.AccessoryCategory2 = res.filter(val => val.accessoryCategoryId == 2);
          this.AccessoryCategory3 = res.filter(val => val.accessoryCategoryId == 3);
          this.AccessoryCategory4 = res.filter(val => val.accessoryCategoryId == 4);
          this.AccessoryCategory5 = res.filter(val => val.accessoryCategoryId == 5);
          this.AccessoryCategory6 = res.filter(val => val.accessoryCategoryId == 6);



        }
        setTimeout(() => this.spinner.hide(), 1000);
      });
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

          this.businessPrice = this.productkart[0]?.businessPrice;
          this.recentlyProduct = product[0].userRecentlyProduct;
          this.RelatedProducts = product[0].relatedProduct;
          debugger
          //this.BindRelatedProductsByCategory(product[0].subcatecode);
        }
        setTimeout(() => this.spinner.hide(), 1000);
      });
    });

  }

  fnCheckAccessory6(list: any, item: any, evt: any, rdoId: string) {
    debugger
    //console.log(list);

    this.checkboxes6.forEach((element) => {

      if (element.nativeElement.value != item.accessoryId)
        element.nativeElement.checked = false;
    });

    this.checkboxes6.forEach((element) => {

      if (element.nativeElement.value != item.accessoryId)
        element.nativeElement.checked = false;
    });


    this.selectedCheckIn = "0"
    if (evt.target.checked) {
      this.selectedCheckIn = item.accessoryId;
      if (item.isAddPrice == 1) {
        this.accessorysummary6.push({
          accessoryId: Number(evt.target.value),
          description: "<span>(+) ₹" + item.price + ' ' + item.name + "</span><br/>",
          RowID: this.productid
        });

        this.updatedPrice6 = item.price;

        //this.updatedPrice = this.updatedPrice > 0 ? this.updatedPrice + item.price : this.businessPrice + item.price;
        //this.accessorysummary = "<span>(+)₹" + item.price + ' ' + item.name + "</span>";
      }
      else {
        this.accessorysummary6.push({
          accessoryId: Number(evt.target.value),
          description: "<span>(-) ₹" + item.price + ' ' + item.name + "</span><br/>",
          RowID: this.productid
        });
        this.updatedPrice6 = -item.price;

        // this.updatedPrice = this.updatedPrice > 0 ? this.updatedPrice - item.price : this.businessPrice - item.price;
      }
    }
    else {
      if (this.accessorysummary6.length > 0) {
        if (item.isAddPrice == 1)
          this.updatedPrice6 = this.updatedPrice6 - item.price
        else
          this.updatedPrice6 = this.updatedPrice6 + item.price
      }
      else {
        this.updatedPrice6 = 0;
      }

      this.accessorysummary6.forEach((item, index) => {
        debugger
        if (item.accessoryId == evt.target.value)
          this.accessorysummary6.splice(index, 1);
      });

    }

  }

  fnCheckAccessory(list: any, item: any, evt: any, rdoId: string) {
    debugger


    this.checkboxes1.forEach((element) => {

      if (element.nativeElement.value != item.accessoryId)
        element.nativeElement.checked = false;
    });

    this.checkboxes1.forEach((element) => {

      if (element.nativeElement.value != item.accessoryId)
        element.nativeElement.checked = false;
    });



    this.accessorysummary.forEach((item, index) => {
      debugger
      this.accessorysummary.splice(index, 1);
    });


    // for (var i = 0; i < list.length; i++) {

    //   this.AccessoryCategory[0].children[i].isSelected = false;
    //   //list[i].isSelected = false;
    // }

    this.selectedCheckIn = "0"
    if (evt.target.checked) {
      this.selectedCheckIn = item.accessoryId;
      if (item.isAddPrice == 1) {
        this.accessorysummary.push({
          accessoryId: Number(evt.target.value),
          description: "<span>(+) ₹" + item.price + ' ' + item.name + "</span><br/>",
          RowID: this.productid
        });

        this.updatedPrice = item.price;

        //this.updatedPrice = this.updatedPrice > 0 ? this.updatedPrice + item.price : this.businessPrice + item.price;
        //this.accessorysummary = "<span>(+)₹" + item.price + ' ' + item.name + "</span>";
      }
      else {
        this.accessorysummary.push({
          accessoryId: Number(evt.target.value),
          description: "<span>(-) ₹" + item.price + ' ' + item.name + "</span><br/>",
          RowID: this.productid
        });
        this.updatedPrice = -item.price;

        // this.updatedPrice = this.updatedPrice > 0 ? this.updatedPrice - item.price : this.businessPrice - item.price;
      }
    }
    else {
      if (this.accessorysummary.length > 0) {
        if (item.isAddPrice == 1)
          this.updatedPrice = this.updatedPrice - item.price
        else
          this.updatedPrice = this.updatedPrice + item.price
      }
      else {
        this.updatedPrice = 0;
      }

      this.accessorysummary.forEach((item, index) => {
        debugger
        if (item.accessoryId == evt.target.value)
          this.accessorysummary.splice(index, 1);
      });

    }

  }

  fnCheckAccessory2(list: any, item: any, evt: any, rdoId: string) {
    debugger
    //console.log(list);

    this.checkboxes2.forEach((element) => {

      if (element.nativeElement.value != item.accessoryId)
        element.nativeElement.checked = false;
    });

    this.checkboxes2.forEach((element) => {

      if (element.nativeElement.value != item.accessoryId)
        element.nativeElement.checked = false;
    });

    // if (this.accessorysummary.length == 0)
    //   evt.target.checked = true;

    this.accessorysummary2.forEach((item, index) => {
      debugger
      this.accessorysummary2.splice(index, 1);
    });


    // for (var i = 0; i < list.length; i++) {

    //   this.AccessoryCategory[0].children[i].isSelected = false;
    //   //list[i].isSelected = false;
    // }

    this.selectedCheckIn = "0"
    if (evt.target.checked) {
      this.selectedCheckIn = item.accessoryId;
      if (item.isAddPrice == 1) {
        this.accessorysummary2.push({
          accessoryId: Number(evt.target.value),
          description: "<span>(+) ₹" + item.price + ' ' + item.name + "</span><br/>",
          RowID: this.productid
        });

        this.updatedPrice2 = item.price;

        //this.updatedPrice = this.updatedPrice > 0 ? this.updatedPrice + item.price : this.businessPrice + item.price;
        //this.accessorysummary = "<span>(+)₹" + item.price + ' ' + item.name + "</span>";
      }
      else {
        this.accessorysummary2.push({
          accessoryId: Number(evt.target.value),
          description: "<span>(-) ₹" + item.price + ' ' + item.name + "</span><br/>",
          RowID: this.productid
        });
        this.updatedPrice2 = -item.price;

        // this.updatedPrice = this.updatedPrice > 0 ? this.updatedPrice - item.price : this.businessPrice - item.price;
      }
    }
    else {
      if (this.accessorysummary2.length > 0) {
        if (item.isAddPrice == 1)
          this.updatedPrice2 = this.updatedPrice2 - item.price
        else
          this.updatedPrice2 = this.updatedPrice2 + item.price
      }
      else {
        this.updatedPrice2 = 0;
      }

      this.accessorysummary2.forEach((item, index) => {
        debugger
        if (item.accessoryId == evt.target.value)
          this.accessorysummary2.splice(index, 1);
      });

    }

  }
  fnCheckAccessory3(list: any, item: any, evt: any, rdoId: string) {
    debugger
    //console.log(list);

    this.checkboxes3.forEach((element) => {

      if (element.nativeElement.value != item.accessoryId)
        element.nativeElement.checked = false;
    });

    this.checkboxes3.forEach((element) => {

      if (element.nativeElement.value != item.accessoryId)
        element.nativeElement.checked = false;
    });

    // if (this.accessorysummary.length == 0)
    //   evt.target.checked = true;

    this.accessorysummary3.forEach((item, index) => {
      debugger
      this.accessorysummary3.splice(index, 1);
    });


    // for (var i = 0; i < list.length; i++) {

    //   this.AccessoryCategory[0].children[i].isSelected = false;
    //   //list[i].isSelected = false;
    // }

    this.selectedCheckIn = "0"
    if (evt.target.checked) {
      this.selectedCheckIn = item.accessoryId;
      if (item.isAddPrice == 1) {
        this.accessorysummary3.push({
          accessoryId: Number(evt.target.value),
          description: "<span>(+) ₹" + item.price + ' ' + item.name + "</span><br/>",
          RowID: this.productid
        });

        this.updatedPrice3 = item.price;

        //this.updatedPrice = this.updatedPrice > 0 ? this.updatedPrice + item.price : this.businessPrice + item.price;
        //this.accessorysummary = "<span>(+)₹" + item.price + ' ' + item.name + "</span>";
      }
      else {
        this.accessorysummary3.push({
          accessoryId: Number(evt.target.value),
          description: "<span>(-) ₹" + item.price + ' ' + item.name + "</span><br/>",
          RowID: this.productid
        });
        this.updatedPrice3 = -item.price;

        // this.updatedPrice = this.updatedPrice > 0 ? this.updatedPrice - item.price : this.businessPrice - item.price;
      }
    }
    else {
      if (this.accessorysummary3.length > 0) {
        if (item.isAddPrice == 1)
          this.updatedPrice3 = this.updatedPrice3 - item.price
        else
          this.updatedPrice3 = this.updatedPrice3 + item.price
      }
      else {
        this.updatedPrice3 = 0;
      }

      this.accessorysummary3.forEach((item, index) => {
        debugger
        if (item.accessoryId == evt.target.value)
          this.accessorysummary3.splice(index, 1);
      });

    }

  }

  fnCheckAccessory4(list: any, item: any, evt: any, rdoId: string) {
    debugger
    //console.log(list);

    this.checkboxes4.forEach((element) => {

      if (element.nativeElement.value != item.accessoryId)
        element.nativeElement.checked = false;
    });

    this.checkboxes4.forEach((element) => {

      if (element.nativeElement.value != item.accessoryId)
        element.nativeElement.checked = false;
    });

    // if (this.accessorysummary.length == 0)
    //   evt.target.checked = true;

    this.accessorysummary4.forEach((item, index) => {
      debugger
      this.accessorysummary4.splice(index, 1);
    });


    // for (var i = 0; i < list.length; i++) {

    //   this.AccessoryCategory[0].children[i].isSelected = false;
    //   //list[i].isSelected = false;
    // }

    this.selectedCheckIn = "0"
    if (evt.target.checked) {
      this.selectedCheckIn = item.accessoryId;
      if (item.isAddPrice == 1) {
        this.accessorysummary4.push({
          accessoryId: Number(evt.target.value),
          description: "<span>(+) ₹" + item.price + ' ' + item.name + "</span><br/>",
          RowID: this.productid
        });

        this.updatedPrice4 = item.price;

        //this.updatedPrice = this.updatedPrice > 0 ? this.updatedPrice + item.price : this.businessPrice + item.price;
        //this.accessorysummary = "<span>(+)₹" + item.price + ' ' + item.name + "</span>";
      }
      else {
        this.accessorysummary4.push({
          accessoryId: Number(evt.target.value),
          description: "<span>(-) ₹" + item.price + ' ' + item.name + "</span><br/>",
          RowID: this.productid
        });
        this.updatedPrice4 = -item.price;

        // this.updatedPrice = this.updatedPrice > 0 ? this.updatedPrice - item.price : this.businessPrice - item.price;
      }
    }
    else {
      if (this.accessorysummary4.length > 0) {
        if (item.isAddPrice == 1)
          this.updatedPrice4 = this.updatedPrice4 - item.price
        else
          this.updatedPrice4 = this.updatedPrice4 + item.price
      }
      else {
        this.updatedPrice4 = 0;
      }

      this.accessorysummary4.forEach((item, index) => {
        debugger
        if (item.accessoryId == evt.target.value)
          this.accessorysummary4.splice(index, 1);
      });

    }

  }

  fnCheckAccessory5(list: any, item: any, evt: any, rdoId: string) {
    debugger
    //console.log(list);

    this.checkboxes5.forEach((element) => {

      if (element.nativeElement.value != item.accessoryId)
        element.nativeElement.checked = false;
    });

    this.checkboxes5.forEach((element) => {

      if (element.nativeElement.value != item.accessoryId)
        element.nativeElement.checked = false;
    });

    // if (this.accessorysummary.length == 0)
    //   evt.target.checked = true;

    this.accessorysummary5.forEach((item, index) => {
      debugger
      this.accessorysummary5.splice(index, 1);
    });


    // for (var i = 0; i < list.length; i++) {

    //   this.AccessoryCategory[0].children[i].isSelected = false;
    //   //list[i].isSelected = false;
    // }

    this.selectedCheckIn = "0"
    if (evt.target.checked) {
      this.selectedCheckIn = item.accessoryId;
      if (item.isAddPrice == 1) {
        this.accessorysummary5.push({
          accessoryId: Number(evt.target.value),
          description: "<span>(+) ₹" + item.price + ' ' + item.name + "</span><br/>",
          RowID: this.productid
        });

        this.updatedPrice5 = item.price;

        //this.updatedPrice = this.updatedPrice > 0 ? this.updatedPrice + item.price : this.businessPrice + item.price;
        //this.accessorysummary = "<span>(+)₹" + item.price + ' ' + item.name + "</span>";
      }
      else {
        this.accessorysummary5.push({
          accessoryId: Number(evt.target.value),
          description: "<span>(-) ₹" + item.price + ' ' + item.name + "</span><br/>",
          RowID: this.productid
        });
        this.updatedPrice5 = -item.price;

        // this.updatedPrice = this.updatedPrice > 0 ? this.updatedPrice - item.price : this.businessPrice - item.price;
      }
    }
    else {
      if (this.accessorysummary5.length > 0) {
        if (item.isAddPrice == 1)
          this.updatedPrice5 = this.updatedPrice - item.price
        else
          this.updatedPrice5 = this.updatedPrice + item.price
      }
      else {
        this.updatedPrice5 = 0;
      }

      this.accessorysummary5.forEach((item, index) => {
        debugger
        if (item.accessoryId == evt.target.value)
          this.accessorysummary5.splice(index, 1);
      });

    }

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
    this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
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
    this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
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
        debugger

        if (this.accessorysummary6.length > 0) {
          this.accessorysummary.push(
            {
              accessoryId: Number(this.accessorysummary6[0].accessoryId),
              description: String(this.accessorysummary6[0].description),
              RowID: this.accessorysummary[0].RowID,
            }
          )
        }

        if (this.accessorysummary2.length > 0) {
          this.accessorysummary.push(
            {
              accessoryId: Number(this.accessorysummary2[0].accessoryId),
              description: String(this.accessorysummary2[0].description),
              RowID: this.accessorysummary[0].RowID,
            }
          )
        }

        if (this.accessorysummary3.length > 0) {
          this.accessorysummary.push(
            {
              accessoryId: Number(this.accessorysummary3[0].accessoryId),
              description: String(this.accessorysummary3[0].description),
              RowID: this.accessorysummary[0].RowID,
            }
          )
        }

        if (this.accessorysummary4.length > 0) {
          this.accessorysummary.push(
            {
              accessoryId: Number(this.accessorysummary4[0].accessoryId),
              description: String(this.accessorysummary4[0].description),
              RowID: this.accessorysummary[0].RowID,
            }
          )
        }

        if (this.accessorysummary5.length > 0) {
          this.accessorysummary.push(
            {
              accessoryId: Number(this.accessorysummary5[0].accessoryId),
              description: String(this.accessorysummary5[0].description),
              RowID: this.accessorysummary[0].RowID,
            }
          )
        }

        if (this.accessorysummary.length > 0) {
          this._CartService.AddToCartAccessory(this.accessorysummary).subscribe(res => {

            if (type == 1)
              this.router.navigate(['/shop/cart']);
            else
              this.router.navigate(['/shop/checkout']);

          });
        }
        if (this.accessorysummary.length == 0) {
          if (type == 1)
            this.router.navigate(['/shop/cart']);
          else
            this.router.navigate(['/shop/checkout']);
        }

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
