import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private router: Router,
    private _SharedDataService: SharedDataService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  ProceedToCheckout() {
    //  

    this.router.navigate(['/shop/checkout']);
    // this._SharedDataService.currentUser.subscribe(res => {
    //   //  
    //   if (res == null || res == undefined) {
    //     //this.router.navigate(['/pages/login']);
    //     this.modalService.open(LoginComponent, {
    //       size: 'lg',
    //       ariaLabelledBy: 'Cart-Modal',
    //       centered: true,
    //       windowClass: 'theme-modal cart-modal CartModal'
    //     });
    //   }
    //   else {
    //     if (res.length > 0) {
    //       this.router.navigate(['/shop/checkout']);
    //     }
    //     else {
    //       //this.router.navigate(['/pages/login']);
    //       this.modalService.open(LoginComponent, {
    //         size: 'lg',
    //         ariaLabelledBy: 'Cart-Modal',
    //         centered: true,
    //         windowClass: 'theme-modal cart-modal CartModal'
    //       });
    //     }
    //   }
    // });
  }
}
