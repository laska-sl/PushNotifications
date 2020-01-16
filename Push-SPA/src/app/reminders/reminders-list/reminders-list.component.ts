import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { ReminderService } from '../../_services/reminder.service';
import { Reminder } from 'src/app/_models/reminder';
import { AuthService } from 'src/app/_services/auth.service';
import { PushNotificationsService } from 'ng-push';
import * as Schedule from 'node-schedule';


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

  constructor(private authService: AuthService, private reminderService: ReminderService,
    private pushNotifications: PushNotificationsService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadAndInitializeReminders();
  }

  loadAndInitializeReminders() {
    this.userId = this.authService.decodedToken.nameid;
    this.reminderService.getReminders(this.userId).subscribe((reminders: Reminder[]) => {
      this.reminders = reminders;
      for (const reminder of reminders) {
        this.jobs.push((Schedule.scheduleJob(reminder.responseTime, () => this.pushNotification(reminder.text))));
        console.log(reminder.responseTime + " ---- " + reminder.text);
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

  refreshReminderList($event) {
    console.log($event);
    this.reminders.push($event);
    this.jobs.push((Schedule.scheduleJob($event.responseTime, () => this.pushNotification($event.text))));
  }


}
