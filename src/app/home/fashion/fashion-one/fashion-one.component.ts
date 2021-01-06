import { Component, OnInit } from '@angular/core';
import { InstaSlider, ProductSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { Productkart } from 'src/app/shared/classes/productkart';
import { ProductsService } from 'src/app/Service/Products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/Service/category.service';
import { CustomerStoryService } from 'src/app/Service/customer-story.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fashion-one',
  templateUrl: './fashion-one.component.html',
  styleUrls: ['./fashion-one.component.scss']
})
export class FashionOneComponent implements OnInit {
  public counter = 43808;
  APIURL=environment.APIURL;
  public ImageSrc: string
  public products: Product[] = [];
  public TodayCounter=new Date();
  public InstaSliderConfig: any = {
    loop: true,
    dots: false,
    navSpeed: 300,
    responsive: {
      740: {
        items: 6
      },
      940: {
        items: 12
      },
      1200: {
        items: 12
      }
    }
  };
  public lstData: any[] = [];
  public Courier: any[] = [
    { CourierImage: "assets/images/Courier/Blue_Dart.jpg" },
    { CourierImage: "assets/images/Courier/Delhivery.jpg" },
    { CourierImage: "assets/images/Courier/DHL.jpg" },
    { CourierImage: "assets/images/Courier/Ecom_Express.jpg" },
    { CourierImage: "assets/images/Courier/Ekart_Logistics.jpg" },
    { CourierImage: "assets/images/Courier/FedEx.jpg" },
    { CourierImage: "assets/images/Courier/GATI.jpg" },
    { CourierImage: "assets/images/Courier/Xpressbees.jpg" }
  ];
  public productCollections: any[] = [
    { name: "new products" },
    // { name: "Refilling" },
    { name: "On Sale" },

  ];

  public productskart: Productkart[] = [];
  public productskartselling: Productkart[] = [];

  public bannerItems: any[];

  constructor(public productService: ProductService,
    private _prodService: ProductsService,
    private spinner: NgxSpinnerService,
    public _categoryService: CategoryService,
    public _customerStory: CustomerStoryService
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

    this.LoadData();
    this.BindProductByCategory();

    var seconds = new Date().getSeconds()
    var today = new Date().getDate()
    var year = new Date().getFullYear()
    var min = new Date().getMinutes()
    var hour = new Date().getHours()

    //var hms = '02:04:33';   // your input string
    //var a = hms.split(':'); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    //var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    this.counter = year + today + hour + min + seconds;
    //console.log(seconds);
    this.Set_Time();
  }

  LoadData() {
    //this.spinner.show();
    this._customerStory.GetCustomerStories().subscribe(res => {
      this.lstData = res;
      //this.spinner.hide();
    });
  }

  Set_Time() {
    // debugger
    if (this.counter != 0) {
      this.counter++;
      this.TodayCounter=new Date();
    }
    else {
      clearTimeout();
    }

    setTimeout(() => {
      // debugger
      if (this.counter > 0) {
        this.Set_Time();
      }
      if (this.counter == 0) {
        //this.router.navigate(['/Profile']);
      }

    }, 5000);

  }




  //Added on 08/07/2020
  BindProductByCategory() {

    let productObj = {
      Active: true,
      Subcatecode: ''

    }
    //this.spinner.show();
    this._prodService.getProductByCategory(productObj).subscribe(products => {
      //  ;
      //this.spinner.hide();
      this.productskart = products;
      this.productskartselling = products.filter(item => item.topSelling == true);

    });

  }

  public ProductSliderConfig: any = ProductSlider;

  // public sliders = [{
  //   title: 'welcome to fashion',
  //   subTitle: 'Men fashion',
  //   image: 'assets/images/slider/banner_1.jpg'
  // }, {
  //   title: 'welcome to fashion',
  //   subTitle: 'Women fashion',
  //   image: 'assets/images/slider/banner_2.jpg'

  // },
  // {
  //   title: 'welcome to fashion',
  //   subTitle: 'Women fashion',
  //   image: 'assets/images/slider/banner_3.jpg'

  // },
  // {
  //   title: 'welcome to fashion',
  //   subTitle: 'Women fashion',
  //   image: 'assets/images/slider/banner_4.jpg'

  // },
  // {
  //   title: 'welcome to fashion',
  //   subTitle: 'Women fashion',
  //   image: 'assets/images/slider/banner_5.jpg'

  // },
  // {
  //   title: 'welcome to fashion',
  //   subTitle: 'Women fashion',
  //   image: 'assets/images/slider/banner_6.jpg'

  // }
  // ]

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



  BindBanner(): void {

    this._categoryService.GetBannerJson().subscribe(bannerItems => {

      this.bannerItems = bannerItems;
      //sliders = this.bannerItems
    });

  }



  ngOnInit(): void {
    this.BindBanner();
  }

  // Product Tab collection
  getCollectionProducts(collection) {

    //  ;
    // if (collection.name == "Refilling")
    //   return this.productskart.filter(item => item.featured == true)
    // else 
    if (collection.name == "new products")
      return this.productskart.filter(item => item.latest == true)

    else if (collection.name == "On Sale")
      return this.productskart.filter(item => item.onSale == true)

  }

}
