import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { ReminderService } from '../../_services/reminder.service';
import { Reminder } from 'src/app/_models/reminder';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.css']
})

export class RemindersListComponent implements OnInit {
  user: User;
  reminders: Reminder[];

  constructor(private authService: AuthService, private reminderService: ReminderService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadReminders();
  }

  loadReminders() {
    this.reminderService.getReminders(this.authService.decodedToken.nameid).subscribe((reminders: Reminder[]) => {
      this.reminders = reminders;
    }, error => {
      this.alertify.error(error);
    });
  }


}
