import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionPage } from './distribution.page';

describe('DistributionPage', () => {
  let component: DistributionPage;
  let fixture: ComponentFixture<DistributionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
