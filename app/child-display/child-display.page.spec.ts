import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDisplayPage } from './child-display.page';

describe('ChildDisplayPage', () => {
  let component: ChildDisplayPage;
  let fixture: ComponentFixture<ChildDisplayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildDisplayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDisplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
