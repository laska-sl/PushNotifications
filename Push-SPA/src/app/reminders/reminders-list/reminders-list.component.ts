import { Component, OnInit } from '@angular/core';
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
    private pushNotificationsService: PushNotificationsService) { }

  ngOnInit() {
    this.pushNotificationsService.requestPermission();
    this.loadAndInitializeReminders();
  }

  loadAndInitializeReminders() {
    this.userId = this.authService.decodedToken.nameid;
    this.reminderService.getReminders(this.userId).subscribe((reminders: Reminder[]) => {
      this.reminders = reminders;
      this.initializeJobs();
    }, error => { }
    );
  }

  pushNotification(text: string) {
    const options = {
      icon: 'assets/alarm.png'
    };
    this.pushNotificationsService.create(text, options).subscribe(
      res => { },
      error => { }
    );
  }

  addNewReminder($event) {
    this.reminderService.getReminders(this.userId).subscribe((reminders: Reminder[]) => {
      this.reminders = reminders;
      this.initializeJobs();
    }, error => { }
    );


    this.addingMode = false;
  }


  deleteReminder($event) {
    const index = this.reminders.indexOf($event);

    if (index !== -1) {
      this.reminders.splice(index, 1);
    }

    this.initializeJobs();
  }

  // adds schedule jobs with push notifications of this.reminders
  initializeJobs() {
    for (const job of this.jobs) {
      if (job != null) {
        job.cancel();
      }
    }
    this.jobs = new Array();
    for (const reminder of this.reminders) {
      this.jobs.push((Schedule.scheduleJob(reminder.responseTime, () => this.pushNotification(reminder.text))));
    }
  }

  // opens adding form
  addingToggle() {
    this.addingMode = true;
  }

  // closes adding form
  cancelAddingMode(addingMode: boolean) {
    this.addingMode = addingMode;
  }
}
