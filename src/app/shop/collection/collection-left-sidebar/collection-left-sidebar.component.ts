import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from "../../../shared/services/product.service";
import { Product } from '../../../shared/classes/product';
import { Productkart } from '../../../shared/classes/productkart';
import { ProductsService } from 'src/app/Service/Products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BrandService } from 'src/app/Service/Brand.service';

@Component({
  selector: 'app-collection-left-sidebar',
  templateUrl: './collection-left-sidebar.component.html',
  styleUrls: ['./collection-left-sidebar.component.scss']
})
export class CollectionLeftSidebarComponent implements OnInit {

  public grid: string = 'col-xl-3 col-md-6';
  public layoutView: string = 'grid-view';
  public products: Product[] = [];

  public productskart: Productkart[] = [];
  public Allproductskart: Productkart[] = [];
  public brands: any[] = [];
  public colors: any[] = [];
  public size: any[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 50000;
  public tags: any[] = [];
  public category: string;
  public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public sortBy: string; // Sorting Order
  public mobileSidebar: boolean = false;
  public loader: boolean = true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService,
    private _prodService: ProductsService,
    private spinner: NgxSpinnerService,
    private Brand: BrandService
  ) {
    // Get Query params..
    this.route.queryParams.subscribe(params => {

      this.brands = params.brand ? params.brand.split(",") : [];
      this.colors = params.color ? params.color.split(",") : [];
      this.size = params.size ? params.size.split(",") : [];
      this.minPrice = params.minPrice ? params.minPrice : this.minPrice;
      this.maxPrice = params.maxPrice ? params.maxPrice : this.maxPrice;
      this.tags = [...this.brands, ...this.colors, ...this.size]; // All Tags Array

      this.category = params.category ? params.category : null;
      this.sortBy = params.sortBy ? params.sortBy : 'ascending';
      this.pageNo = params.page ? params.page : this.pageNo;

      // Get Filtered Products..
      //this.productService.filterProducts(this.tags).subscribe(response => {



      // ***********************************************************
      //
      //******************Category Filter*******************************
      //
      //*********************************************************** */

      // if (params.category) {

      //   this.products = this.products.filter(item => item.type == this.category);
      // }

      //  
      debugger
      if (params.category == undefined || params.category) {
        this.BindProductByCategory();
        //this.BindBrand();
      }

      //})
    })
  }

  // BindBrand() {
  //   let obj = {
  //     Active: 1
  //   }
  //    
  //   this.Brand.GetAllBrand(obj).subscribe(res => {
  //      
  //     this.brands = res;
  //   });
  // }

  //Added on 08/07/2020
  BindProductByCategory() {
    this.spinner.show();
    this.route.queryParams.subscribe((params: Params) => {
       
      const category = params['category'];
      let productObj = {
        Active: true,
        Subcatecode: category == 'fashion' ? '' : category

      }
      debugger
      this._prodService.getProductByCategory(productObj).subscribe(products => {
        let FilteredProduct = products;
        this.Allproductskart = products;
        this.route.paramMap.subscribe((params: ParamMap) => {
           
          let type = params.get('type');
          if (type == 'Refilling') {
            FilteredProduct = products.filter(a => a.featured == true);
          }
          else if (type == 'BestSellers') {
            FilteredProduct = products.filter(a => a.topSelling == true);
          }
          else
            this.productskart = products;
           
          let BrandFilter: any[] = [];
          if (this.brands.length > 0) {
            (this.brands).forEach(element => {
              FilteredProduct.forEach(ele => {
                if (ele.brandName == element) {
                  BrandFilter.push(ele);
                }
              });
            });
            FilteredProduct = BrandFilter;
          }
          // Brand Filter
          //this.productskart = this.productService.filter(FilteredProduct, this.sortBy);
          // Sorting Filter
          this.productskart = this.productService.sortProducts(FilteredProduct, this.sortBy);
          // Price Filter
          this.productskart = this.productskart.filter(item => item.price >= this.minPrice && item.price <= this.maxPrice)
          ////  
          // Paginate Products
          this.paginate = this.productService.getPager(this.productskart.length, +this.pageNo);     // get paginate object from service
          this.productskart = this.productskart.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items
          setTimeout(() => this.spinner.hide(), 2000);
        });

      });
    });
  }


  ngOnInit(): void {
  }


  // Append filter value to Url
  updateFilter(tags: any) {
     
    tags.page = null; // Reset Pagination
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: tags,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // SortBy Filter
  sortByFilter(value) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('productskart'); // Anchore Link
    });
  }

  // Remove Tag
  removeTag(tag) {

    this.brands = this.brands.filter(val => val !== tag);
    this.colors = this.colors.filter(val => val !== tag);
    this.size = this.size.filter(val => val !== tag);

    let params = {
      brand: this.brands.length ? this.brands.join(",") : null,
      color: this.colors.length ? this.colors.join(",") : null,
      size: this.size.length ? this.size.join(",") : null
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Clear Tags
  removeAllTags() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // product Pagination
  setPage(page: number) {
     
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
       
      this.viewScroller.setOffset([220, 220]);
      this.viewScroller.scrollToAnchor('productskart'); // Anchore Link
    });
  }

  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if (value == 'list-view')
      this.grid = 'col-lg-12';
    else
      this.grid = 'col-xl-3 col-md-6';
  }

  // Mobile sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

}
