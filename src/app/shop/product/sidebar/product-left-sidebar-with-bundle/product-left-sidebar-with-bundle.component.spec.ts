import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLeftSidebarWithBundleComponent } from './product-left-sidebar-with-bundle.component';

describe('ProductLeftSidebarWithBundleComponent', () => {
  let component: ProductLeftSidebarWithBundleComponent;
  let fixture: ComponentFixture<ProductLeftSidebarWithBundleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLeftSidebarWithBundleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLeftSidebarWithBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
