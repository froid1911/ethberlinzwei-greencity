import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoddieComponent } from './goddie.component';

describe('GoddieComponent', () => {
  let component: GoddieComponent;
  let fixture: ComponentFixture<GoddieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoddieComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoddieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
