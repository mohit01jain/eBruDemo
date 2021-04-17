import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivablePage } from './receivable.page';

describe('ReceivablePage', () => {
  let component: ReceivablePage;
  let fixture: ComponentFixture<ReceivablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
