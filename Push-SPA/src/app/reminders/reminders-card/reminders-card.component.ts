import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reminder } from 'src/app/_models/reminder';
import { AuthService } from 'src/app/_services/auth.service';
import { ReminderService } from 'src/app/_services/reminder.service';

@Component({
  selector: 'app-reminders-card',
  templateUrl: './reminders-card.component.html',
  styleUrls: ['./reminders-card.component.css']
})
export class RemindersCardComponent implements OnInit {
  @Input() reminder: Reminder;
  @Output() deletedReminder = new EventEmitter();

  constructor(private authService: AuthService, private reminderService: ReminderService) { }

  ngOnInit() { }

  deleteReminder() {
    this.reminderService.deleteReminder(this.authService.decodedToken.nameid, this.reminder.id).subscribe(() => {
      this.deletedReminder.emit(this.reminder);
    }, error => {
    });
  }
}
