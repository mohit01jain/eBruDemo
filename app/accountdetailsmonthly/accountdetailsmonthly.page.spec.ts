import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountdetailsmonthlyPage } from './accountdetailsmonthly.page';

describe('AccountdetailsmonthlyPage', () => {
  let component: AccountdetailsmonthlyPage;
  let fixture: ComponentFixture<AccountdetailsmonthlyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountdetailsmonthlyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountdetailsmonthlyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
