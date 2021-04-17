import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOrderListPage } from './tab-order-list.page';

describe('TabOrderListPage', () => {
  let component: TabOrderListPage;
  let fixture: ComponentFixture<TabOrderListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabOrderListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabOrderListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
