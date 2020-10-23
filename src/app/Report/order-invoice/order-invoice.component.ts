import { Component, OnInit, AfterViewInit } from '@angular/core';
//import { OrderService } from '../../../shared/services/order.service';
import { OrderService } from 'src/app/Service/order.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss']
})
export class OrderInvoiceComponent implements OnInit {
  public ProductImage = environment.ProductImage;
  public orderDetails: any[] = [];
  user: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _OrderService: OrderService,
    private spinner: NgxSpinnerService,
    public productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      //this.GetOrderById(Number(params.get('orderId')));
      var GUID = params.get('id');
      //if (GUID != null) {
        let obj = {
          GUID: GUID
        };
        this.spinner.show();
        this._OrderService.GetSuccessPrintOrderByGUID(obj).subscribe(res => {
          this.spinner.hide();

          //if (res > 0)
          this.orderDetails = res;
          //console.log(res);
          setTimeout(() => {
            window.print();
          }, 1000);
          
        });
      //}
    });
  }

  getTotal() {
    var TotalAmount = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalAmount += Number(((element.salePrice * element.quantity) - element.additionalDiscountAmount + element.gstAmount).toFixed(2));
    });
    return TotalAmount;
  }

  getQty() {
    var TotalQty = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalQty += Number((element.quantity).toFixed(2));
    });
    return TotalQty;
  }

  getTotalAdditionalDiscountAmount() {
    var TotalAdditionalDiscountAmount = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalAdditionalDiscountAmount += Number((element.additionalDiscountAmount).toFixed(2));
    });
    return TotalAdditionalDiscountAmount;
  }

  getTotalAmountWithDis(){
    var TotalAmount = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalAmount += Number(((element.salePrice * element.quantity) - element.additionalDiscountAmount).toFixed(2));
    });
    return TotalAmount;
  }

  getTotalAmountWithOutGST() {
    var TotalAmountWithOutGST = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalAmountWithOutGST += Number(((element.salePrice * element.quantity) - element.additionalDiscountAmount).toFixed(2));
    });
    return TotalAmountWithOutGST;
  }


  getTotalGSTAmount() {
    var TotalGSTAmount = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalGSTAmount += Number((element.gstAmount).toFixed(2));
    });
    return TotalGSTAmount;
  }
}
