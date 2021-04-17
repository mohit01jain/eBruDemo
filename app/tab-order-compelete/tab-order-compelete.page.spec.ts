import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOrderCompeletePage } from './tab-order-compelete.page';

describe('TabOrderCompeletePage', () => {
  let component: TabOrderCompeletePage;
  let fixture: ComponentFixture<TabOrderCompeletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabOrderCompeletePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabOrderCompeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
