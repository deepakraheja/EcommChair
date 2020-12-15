import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/Service/Products.service';
import { ProductSlider } from 'src/app/shared/data/slider';
import { Product } from '../../../../shared/classes/product';
import { ProductService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss']
})
export class RelatedProductComponent implements OnInit {
  
  @Input() type: string
  public ProductSliderConfig: any = ProductSlider;
  public products: Product[] = [];

  constructor(
    public productService: ProductService,
    private _prodService: ProductsService,
    private spinner: NgxSpinnerService,
    //public _categoryService: CategoryService,
    ) { 
    // this.productService.getProducts.subscribe(response => 
    //   this.products = response.filter(item => item.type == this.type)
    // );
    this.BindProductByCategory();
  }

  
  //Added on 08/07/2020
  BindProductByCategory() {

    let productObj = {
      Active: true,
      Subcatecode: ''

    }
    this.spinner.show();
    this._prodService.getProductByCategory(productObj).subscribe(products => {
      //  ;
      this.spinner.hide();
      this.products = products;
      //this.productskartselling = products.filter(item => item.topSelling == true);

    });

  }


  ngOnInit(): void {
  }

}
