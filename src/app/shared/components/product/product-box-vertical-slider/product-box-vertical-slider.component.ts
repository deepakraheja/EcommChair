import { Component, OnInit, Input } from '@angular/core';
import { NewProductSlider } from '../../../data/slider';
import { Product } from '../../../classes/product';
import { ProductService } from '../../../services/product.service';
import { Productkart } from 'src/app/shared/classes/productkart';
import { ProductsService } from 'src/app/Service/Products.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/pages/account/login/login.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-box-vertical-slider',
  templateUrl: './product-box-vertical-slider.component.html',
  styleUrls: ['./product-box-vertical-slider.component.scss']
})
export class ProductBoxVerticalSliderComponent implements OnInit {
  public ProductImage = environment.ProductImage;
  @Input() title: string = 'New Product'; // Default
  @Input() type: string = 'fashion'; // Default Fashion
  public ImageSrc: string
  //public products : Product[] = [];
  public user: any[] = JSON.parse(sessionStorage.getItem('LoggedInUser'));
  public NewProductSliderConfig: any = NewProductSlider;
  public productskart: Productkart[] = [];
  constructor(
    public productService: ProductService,
    private _prodService: ProductsService,
    private modalService: NgbModal,
    private router: Router
  ) {
    // this.productService.getProducts.subscribe(response => 
    //   this.products = response.filter(item => item.type == this.type)
    // );
    this.BindProductByCategory();
  }

  ngOnInit(): void {
  }

  BindProductByCategory() {

    let productObj = {
      Active: true,
      Subcatecode: ''
    }
    this._prodService.getProductByCategory(productObj).subscribe(products => {
      //  ;
      //this.productskart = products;
      this.productskart = products.filter(item => item.latest == true);
    });
  }

  GoToDetail(rowID, productSizeColorId, setType) {
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
      if (setType == 1)
        this.router.navigateByUrl('/shop/product/left/sidebar/' + rowID + '/' + productSizeColorId);
      else if (setType == 2)
        this.router.navigateByUrl('/shop/product/left/sidebarwithset/' + rowID + '/' + productSizeColorId);
      if (setType == 3)
        this.router.navigateByUrl('/shop/product/left/sidebarwithbundle/' + rowID + '/' + productSizeColorId);
    }
  }
}
