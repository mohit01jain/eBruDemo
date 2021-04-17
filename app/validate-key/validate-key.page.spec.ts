import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateKeyPage } from './validate-key.page';

describe('ValidateKeyPage', () => {
  let component: ValidateKeyPage;
  let fixture: ComponentFixture<ValidateKeyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateKeyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateKeyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
