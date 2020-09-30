import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuickViewComponent } from "../../modal/quick-view/quick-view.component";
import { CartModalComponent } from "../../modal/cart-modal/cart-modal.component";
import { Product } from "../../../classes/product";
import { ProductService } from "../../../services/product.service";
import { Productkart } from '../../../../shared/classes/productkart';
import { environment } from 'src/environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/pages/account/login/login.component';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit {

  public ProductImage = environment.ProductImage;
  @Input() product: Product;
  @Input() productkart: Productkart;
  @Input() currency: any = this.productService.Currency; // Default Currency 
  @Input() thumbnail: boolean = false; // Default False 
  @Input() onHowerChangeImage: boolean = false; // Default False
  @Input() cartModal: boolean = false; // Default False
  @Input() loader: boolean = false;
  public user: any[] = JSON.parse(sessionStorage.getItem('LoggedInUser'));
  // @ViewChild("quickView") QuickView: QuickViewComponent;
  // @ViewChild("cartModal") CartModal: CartModalComponent;
  //public closeResult: string;
  public ImageSrc: string

  constructor(private productService: ProductService,
    private modalService: NgbModal,
    private _SharedDataService: SharedDataService,
    private router: Router,
    private _CartService: CartService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    //  ;
    if (this.loader) {
      setTimeout(() => { this.loader = false; }, 2000); // Skeleton Loader
    }
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = [];
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }
  // Get Product Size
  Size(variants) {
    //  ;
    const uniqSize = [];
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size + ' ') === -1 && variants[i].size) {
        uniqSize.push(variants[i].size + ' ')
      }
    }
    return uniqSize
  }

  // Change Variants
  ChangeVariants(color, product) {
    product.variants.map((item) => {
      if (item.color === color) {
        product.images.map((img) => {
          if (img.image_id === item.image_id) {
            this.ImageSrc = img.src;
          }
        })
      }
    })
  }

  // Change Variants Image
  ChangeVariantsImage(src) {
    this.ImageSrc = src;
  }

  GoToDetail(rowID, productSizeColorId, setType, setNo) {
    this.user = JSON.parse(sessionStorage.getItem('LoggedInUser'));
    //  
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
  addToCart(product: any) {
    this.user = JSON.parse(sessionStorage.getItem('LoggedInUser'));
    //  
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
      let obj = {
        UserID: Number(this.user[0].userID),
        ProductSizeId: Number(product.productSizeId),
        Quantity: Number(product.quantity)
      }
      // this._CartService.AddToCart(obj).subscribe(res => {
      //   this.toastr.success("Product has been successfully added in cart.");
      // });
    }
  }

  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  addToCompare(product: any) {
    this.productService.addToCompare(product);
  }

}
