import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Order } from '../../../shared/classes/order';
//import { OrderService } from '../../../shared/services/order.service';
import { ProductService } from '../../../shared/services/product.service';
import { OrderService } from 'src/app/Service/order.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, AfterViewInit {
  public ProductImage = environment.ProductImage;
  public orderDetails: any[] = [];
  user: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    //private orderService: OrderService
    private _OrderService: OrderService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      //  
      //this.GetOrderById(Number(params.get('orderId')));
      var orderId = params.get('id');
      if (Number(orderId) != NaN && orderId.length <= 9) {
        let obj = {
          OrderId: Number(orderId)
        };
        this.spinner.show();
        this._OrderService.GetSuccessOrderByOrderId(obj).subscribe(res => {
          this.spinner.hide();
           
          //if (res > 0)
            this.orderDetails = res;
          //console.log(res);
        });
      }
    });
    //this.orderService.checkoutItems.subscribe(response => this.orderDetails = response);
    //this.user = JSON.parse(sessionStorage.getItem('LoggedInUser'));

  }

  ngAfterViewInit() {

  }

  getTotal() {
     
    var TotalAmount = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalAmount += (element.price * element.quantity) + element.gstAmount
    });
    return TotalAmount;
  }

  getTotalGSTAmount() {
    var TotalGSTAmount = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalGSTAmount += element.gstAmount
    });
    return TotalGSTAmount;
  }
}
