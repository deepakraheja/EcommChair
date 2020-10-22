import { Component, OnInit } from '@angular/core';
import { ProductSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { Productkart } from 'src/app/shared/classes/productkart';
import { ProductsService } from 'src/app/Service/Products.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-fashion-one',
  templateUrl: './fashion-one.component.html',
  styleUrls: ['./fashion-one.component.scss']
})
export class FashionOneComponent implements OnInit {

  public products: Product[] = [];
  public productCollections: any[] = [
    { name: "new products" },
    { name: "Refilling" },
    { name: "On Sale" },

  ];

  public productskart: Productkart[] = [];
  public productskartselling: Productkart[] = [];

  constructor(public productService: ProductService,
    private _prodService: ProductsService,
    private spinner: NgxSpinnerService,
  ) {

    // this.productService.getProducts.subscribe(response => {
    //   this.products = response.filter(item => item.type == 'fashion');
    //   // Get Product Collection
    //   this.products.filter((item) => {
    //     item.collection.filter((collection) => {
    //       const index = this.productCollections.indexOf(collection);
    //       if (index === -1) this.productCollections.push(collection);
    //     })
    //   })
    // });


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
      this.productskart = products;
      this.productskartselling = products.filter(item => item.topSelling == true);

    });

  }

  public ProductSliderConfig: any = ProductSlider;

  public sliders = [{
    // title: 'welcome to fashion',
    //subTitle: ''Men fashion'',
    image: 'assets/images/slider/banner_1.jpg'
  }, {
    //title: 'welcome to fashion',
    //subTitle: 'Women fashion',
    image: 'assets/images/slider/banner_2.jpg'

  },
  {
    image: 'assets/images/slider/banner_3.jpg'

  },
  {
    image: 'assets/images/slider/banner_4.jpg'

  },
  {
    image: 'assets/images/slider/banner_5.jpg'

  },
  {
    image: 'assets/images/slider/banner_6.jpg'

  }
  ]

  // Collection banner
  public collections = [{
    image: 'assets/images/collection/fashion/1.jpg',
    save: 'save 50%',
    title: 'men'
  }, {
    image: 'assets/images/collection/fashion/2.jpg',
    save: 'save 50%',
    title: 'women'
  }];

  // Blog
  public blog = [{
    image: 'assets/images/blog/1.jpg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/2.jpg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/3.jpg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/4.jpg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }];

  // Logo
  public logo = [{
    image: 'assets/images/logos/1.png',
  }, {
    image: 'assets/images/logos/2.png',
  }, {
    image: 'assets/images/logos/3.png',
  }, {
    image: 'assets/images/logos/4.png',
  }, {
    image: 'assets/images/logos/5.png',
  }, {
    image: 'assets/images/logos/6.png',
  }, {
    image: 'assets/images/logos/7.png',
  }, {
    image: 'assets/images/logos/8.png',
  }];

  ngOnInit(): void {
  }

  // Product Tab collection
  getCollectionProducts(collection) {

    //  ;
    if (collection.name == "Refilling")
      return this.productskart.filter(item => item.featured == true)
    else if (collection.name == "new products")
      return this.productskart.filter(item => item.latest == true)

    else if (collection.name == "On Sale")
      return this.productskart.filter(item => item.onSale == true)

  }

}
