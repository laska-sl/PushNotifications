import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { ReminderService } from '../../_services/reminder.service';
import { Reminder } from 'src/app/_models/reminder';
import { AuthService } from 'src/app/_services/auth.service';
import { PushNotificationsService } from 'ng-push';
import * as Schedule from 'node-schedule';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.css']
})

export class RemindersListComponent implements OnInit {
  reminders: Reminder[];
  reminderForCreate: any = {};
  userId: number;
  addingMode = false;
  jobs = new Array();
  subscribtion: Subscription;

  constructor(private authService: AuthService, private reminderService: ReminderService,
    private pushNotifications: PushNotificationsService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadAndInitializeReminders();
  }

  loadAndInitializeReminders() {
    this.clearJobs();
    this.userId = this.authService.decodedToken.nameid;
    this.subscribtion = this.reminderService.getReminders(this.userId).subscribe((reminders: Reminder[]) => {
      this.reminders = reminders;
      for (const reminder of reminders) {
        this.jobs.push((Schedule.scheduleJob(reminder.responseTime, () => this.pushNotification(reminder.text))));
        console.log(reminder.id + ' ---- ' + reminder.responseTime + " ---- " + reminder.text);
      }
    }, error => {
      console.log(error);
    });
  }

  pushNotification(text: string) {
    this.pushNotifications.create(text).subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }

  addingToggle() {
    this.addingMode = true;
  }

  cancelAddingMode(addingMode: boolean) {
    this.addingMode = addingMode;
  }

  addNewReminder($event) {
    this.subscribtion = this.reminderService.getReminders(this.userId).subscribe((reminders: Reminder[]) => {
      this.reminders = [];
      this.clearJobs();
      for (const reminder of reminders) {
        this.reminders.push(reminder);
        this.jobs.push((Schedule.scheduleJob(reminder.responseTime, () => this.pushNotification(reminder.text))));
      }
    }, error => {
      console.log(error);
    });


    this.addingMode = false;
  }

  deleteReminder($event) {
    const index = this.reminders.indexOf($event);

    if (index !== -1) {
      this.reminders.splice(index, 1);
    }

    this.clearJobs();

    for (const reminder of this.reminders) {
      this.jobs.push((Schedule.scheduleJob(reminder.responseTime, () => this.pushNotification(reminder.text))));
    }

  }

  clearJobs() {
    for (const job of this.jobs) {
      if (job != null) {
        job.cancel();
      }
    }
    this.jobs = new Array();
  }
}
