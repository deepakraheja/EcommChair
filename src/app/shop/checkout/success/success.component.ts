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
  public IsInvalidOrder = false;
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
      var GUID = params.get('id');
      //if (Number(orderId) != NaN && orderId.length <= 9) {
        let obj = {
          GUID: GUID
        };
        //this.spinner.show();
        this._OrderService.GetNewOrderByGUID(obj).subscribe(res => {
          this.spinner.hide();

          if (res.length == 0)
            this.IsInvalidOrder = true;
          else
            this.IsInvalidOrder = false;
          this.orderDetails = res;
          //console.log(res);
        });
      //}
    });
    //this.orderService.checkoutItems.subscribe(response => this.orderDetails = response);
    //this.user = JSON.parse(localStorage.getItem('LoggedInUser'));

  }

  ngAfterViewInit() {

  }

  getTotal() {

    var TotalAmount = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalAmount += Number(((element.salePrice * element.quantity) - element.additionalDiscountAmount + element.gstAmount));
    });
    return TotalAmount;
  }

  getTotalQty() {
    var TotalQty = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalQty += Number((element.quantity));
    });
    return TotalQty;
  }


  getTotalAdditionalDiscountAmount() {
    var TotalAdditionalDiscountAmount = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalAdditionalDiscountAmount += Number((element.additionalDiscountAmount));
    });
    return TotalAdditionalDiscountAmount;
  }

  getTotalAmountWithDis(){
    var TotalAmount = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalAmount += Number(((element.salePrice * element.quantity) - element.additionalDiscountAmount));
    });
    return TotalAmount;
  }

  getTotalGSTAmount() {
    var TotalGSTAmount = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalGSTAmount += Number((element.gstAmount));
    });
    return TotalGSTAmount;
  }
}
