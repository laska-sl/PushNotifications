import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reminder } from 'src/app/_models/reminder';
import { AuthService } from 'src/app/_services/auth.service';
import { ReminderService } from 'src/app/_services/reminder.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-reminders-card',
  templateUrl: './reminders-card.component.html',
  styleUrls: ['./reminders-card.component.css']
})
export class RemindersCardComponent implements OnInit {
  @Input() reminder: Reminder;
  @Output() deletedReminder = new EventEmitter();

  constructor(private alertify: AlertifyService, private authService: AuthService, private reminderService: ReminderService) { }

  ngOnInit() { }

  deleteReminder() {
    this.reminderService.deleteReminder(this.authService.decodedToken.nameid, this.reminder.id).subscribe(() => {
      this.alertify.success('Successfully deleted');
      this.deletedReminder.emit(this.reminder);
    }, error => {
      this.alertify.error(error);
    });
  }
}
