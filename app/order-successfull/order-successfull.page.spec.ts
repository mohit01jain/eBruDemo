import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSuccessfullPage } from './order-successfull.page';

describe('OrderSuccessfullPage', () => {
  let component: OrderSuccessfullPage;
  let fixture: ComponentFixture<OrderSuccessfullPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSuccessfullPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSuccessfullPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
