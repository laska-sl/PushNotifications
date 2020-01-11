/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RemindersCardComponent } from './reminders-card.component';

describe('RemindersCardComponent', () => {
  let component: RemindersCardComponent;
  let fixture: ComponentFixture<RemindersCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindersCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
