import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpasIntegrationPage } from './mpas-integration.page';

describe('MpasIntegrationPage', () => {
  let component: MpasIntegrationPage;
  let fixture: ComponentFixture<MpasIntegrationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpasIntegrationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpasIntegrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
