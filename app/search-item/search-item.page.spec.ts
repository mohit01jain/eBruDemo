import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemPage } from './search-item.page';

describe('SearchItemPage', () => {
  let component: SearchItemPage;
  let fixture: ComponentFixture<SearchItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
