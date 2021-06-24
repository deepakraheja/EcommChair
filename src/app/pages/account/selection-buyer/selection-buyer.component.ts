import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
//import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


// import { BsModalRef } from 'ngx-bootstrap/modal';
// import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-selection-buyer',
  templateUrl: './selection-buyer.component.html',
  styleUrls: ['./selection-buyer.component.scss']
})
export class SelectionBuyerComponent implements OnInit {
  submitted: boolean = false;
  modalRef: BsModalRef;
  isSelected: false;
  constructor(
    private router: Router,
    //  private modalService: NgbModal,
    public modalService: BsModalService,
    private NgmodalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  fnSubmit(type: string) {

    localStorage.setItem('Bbuyer', type);
    this.router.navigate(['/pages/register']);
    this.modalService.hide();
    this.NgmodalService.dismissAll();

  }

  onChangePersonal(type: string, template: TemplateRef<any>) {
    debugger;

    if (type == "false") {
      localStorage.setItem('Bbuyer', type);
      this.router.navigate(['/pages/register']);
      this.NgmodalService.dismissAll();
    }
    else {
      this.modalRef = this.modalService.show(template);
    }


    // this.modalService.open(template, {
    //   size: 'md',
    //   //ariaLabelledBy: 'Cart-Modal',
    //   centered: true,
    //   //windowClass: 'theme-modal cart-modal CartModal',
    //   backdrop: 'static',
    //   keyboard: false
    // }).result.then((result) => {
    //   `Result ${result}`
    // }, (reason) => {
    //   //this.modalService.dismissAll();
    // });



    // var flag = confirm("If you are a bulk buyer then you will be unable to buy less than 10 piece for single design and Company name, GST number are mandatory");
    // if (!flag) {
    //   return false;
    // }

    // this.modalRef = this.modalService.show(template, {

    // });

    //localStorage.setItem('Bbuyer', type);
    //this.router.navigate(['/pages/register']);
    //this.modalService.dismissAll();

  }

  close() {

    debugger
    this.isSelected = false;
    this.modalService.hide();
  }
}