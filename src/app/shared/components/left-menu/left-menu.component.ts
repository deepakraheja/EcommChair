import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Service/category.service'

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  public menuItems: Menu[];

  constructor(private router: Router,
    public navServices: NavService,
    public _categoryService: CategoryService,
  ) {
    // this.navServices.leftMenuItems.subscribe(menuItems => this.menuItems = menuItems);
    // this.router.events.subscribe((event) => {
    //   this.navServices.mainMenuToggle = false;
    // });
  }

  BindCategory(): void {
   
    this._categoryService.GetCategoryJson().subscribe(menuItems => {
      
      this.menuItems = menuItems;

    });
    this.router.events.subscribe((event) => {
      this.navServices.mainMenuToggle = false;
    });
  }

  ngOnInit(): void {

    this.BindCategory();
  }

  leftMenuToggle(): void {
    this.navServices.leftMenuToggle = !this.navServices.leftMenuToggle;
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }

}
