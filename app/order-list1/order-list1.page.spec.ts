import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderList1Page } from './order-list1.page';

describe('OrderList1Page', () => {
  let component: OrderList1Page;
  let fixture: ComponentFixture<OrderList1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderList1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderList1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
