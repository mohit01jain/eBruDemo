import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiosolvePage } from './radiosolve.page';

describe('RadiosolvePage', () => {
  let component: RadiosolvePage;
  let fixture: ComponentFixture<RadiosolvePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadiosolvePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiosolvePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
