import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../shared/classes/product';
import { Productkart } from 'src/app/shared/classes/productkart';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  @Input() products: Product[] = [];
  @Input() productskart: Productkart[] = [];
  @Input() brands: any[] = [];

  @Output() brandsFilter: EventEmitter<any> = new EventEmitter<any>();
  
  public collapse: boolean = true;

  constructor() { 
  }

  ngOnInit(): void {
  }

  get filterbyBrand() {
     
    const uniqueBrands = [];
    this.productskart.filter((product) => {
       
      if (product.brandName) {
        const index = uniqueBrands.indexOf(product.brandName)
        if (index === -1) uniqueBrands.push(product.brandName)
      }
    })
    return uniqueBrands
  }

  appliedFilter(event) {
     
    let index = this.brands.indexOf(event.target.value);  // checked and unchecked value
    if (event.target.checked)   
      this.brands.push(event.target.value); // push in array cheked value
    else 
      this.brands.splice(index,1);  // removed in array unchecked value  
    
    let brands = this.brands.length ? { brand: this.brands.join(",") } : { brand: null };
    this.brandsFilter.emit(brands);
  }

  // check if the item are selected
  checked(item){
    if(this.brands.indexOf(item) != -1){
      return true;
    }
  }

}
