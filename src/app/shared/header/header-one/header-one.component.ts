import { Component, OnInit, Input, HostListener } from '@angular/core';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { Router, NavigationEnd } from '@angular/router';
import { LoginComponent } from 'src/app/pages/account/login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
  
  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/icon/logo.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false
  
  public stick: boolean = false;
  public LoggedInUser: any[] = [];
  constructor(
    private router: Router,
    private _SharedDataService: SharedDataService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this._SharedDataService.currentUser.subscribe(a => {
      this.LoggedInUser = a;
    });
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number >= 300 && window.innerWidth > 400) { 
  	  this.stick = true;
  	} else {
  	  this.stick = false;
  	}
  }

  Logout() {
    sessionStorage.removeItem('LoggedInUser');
    this.LoggedInUser = [];
    this._SharedDataService.AssignUser(null);
    this.router.navigate(['/home/fashion']);
  }
  Login() {
    this.modalService.open(LoginComponent, {
      size: 'lg',
      //ariaLabelledBy: 'Cart-Modal',
      centered: true,
      //windowClass: 'theme-modal cart-modal CartModal'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.modalService.dismissAll();
    });
  }
}
