import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithOptionPage } from './login-with-option.page';

describe('LoginWithOptionPage', () => {
  let component: LoginWithOptionPage;
  let fixture: ComponentFixture<LoginWithOptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWithOptionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWithOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
