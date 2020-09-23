import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLeftSidebarWithSetComponent } from './product-left-sidebar-with-set.component';

describe('ProductLeftSidebarWithSetComponent', () => {
  let component: ProductLeftSidebarWithSetComponent;
  let fixture: ComponentFixture<ProductLeftSidebarWithSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLeftSidebarWithSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLeftSidebarWithSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
