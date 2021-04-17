import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountdetailsPage } from './accountdetails.page';

describe('AccountdetailsPage', () => {
  let component: AccountdetailsPage;
  let fixture: ComponentFixture<AccountdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountdetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
