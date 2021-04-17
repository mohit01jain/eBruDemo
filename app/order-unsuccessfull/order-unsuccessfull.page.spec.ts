import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUnsuccessfullPage } from './order-unsuccessfull.page';

describe('OrderUnsuccessfullPage', () => {
  let component: OrderUnsuccessfullPage;
  let fixture: ComponentFixture<OrderUnsuccessfullPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderUnsuccessfullPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUnsuccessfullPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
