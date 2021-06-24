import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionBuyerComponent } from './selection-buyer.component';

describe('SelectionBuyerComponent', () => {
  let component: SelectionBuyerComponent;
  let fixture: ComponentFixture<SelectionBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
