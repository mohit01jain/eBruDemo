import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAddressPage } from './add-new-address.page';

describe('AddNewAddressPage', () => {
  let component: AddNewAddressPage;
  let fixture: ComponentFixture<AddNewAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewAddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
