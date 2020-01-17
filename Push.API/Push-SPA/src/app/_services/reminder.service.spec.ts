/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReminderService } from './reminder.service';

describe('Service: Reminder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReminderService]
    });
  });

  it('should ...', inject([ReminderService], (service: ReminderService) => {
    expect(service).toBeTruthy();
  }));
});
