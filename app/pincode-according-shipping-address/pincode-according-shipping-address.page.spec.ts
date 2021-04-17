import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodeAccordingShippingAddressPage } from './pincode-according-shipping-address.page';

describe('PincodeAccordingShippingAddressPage', () => {
  let component: PincodeAccordingShippingAddressPage;
  let fixture: ComponentFixture<PincodeAccordingShippingAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PincodeAccordingShippingAddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PincodeAccordingShippingAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
