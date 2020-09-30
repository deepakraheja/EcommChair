import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';
import { SubCategoryService } from 'src/app/Service/Subcategory.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public products: Product[] = [];
  public collapse: boolean = true;
  lstsubCategory: any[];

  constructor(public productService: ProductService,
    private _subcatService: SubCategoryService) {
    this.productService.getProducts.subscribe(product => this.products = product);
  }

  ngOnInit(): void {
    this.BindSubCategory();
  }

  //commented on 08/07/2020
  
  // get filterbyCategory() {
  //   const category = [...new Set(this.products.map(product => product.type))]
  //   return category
  // }

  BindSubCategory() {
     
    let subCatObj = {
      SideSubCategory: null

    }

    this._subcatService.GetSideSubcategory(subCatObj).subscribe(res => {
      this.lstsubCategory = res;
    });
  }

}
