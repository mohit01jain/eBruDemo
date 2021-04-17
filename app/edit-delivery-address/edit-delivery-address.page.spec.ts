/*
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeliveryAddressPage } from './edit-delivery-address.page';

describe('EditDeliveryAddressPage', () => {
  let component: EditDeliveryAddressPage;
  let fixture: ComponentFixture<EditDeliveryAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeliveryAddressPage ],
/*
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
*/
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeliveryAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
