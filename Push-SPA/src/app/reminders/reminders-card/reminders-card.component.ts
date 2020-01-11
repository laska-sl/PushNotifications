import { Component, OnInit, Input } from '@angular/core';
import { Reminder } from 'src/app/_models/reminder';
import { AlertifyService } from 'src/app/_services/alertify.service';
import * as Schedule from 'node-schedule';
import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';



@Component({
  selector: 'app-reminders-card',
  templateUrl: './reminders-card.component.html',
  styleUrls: ['./reminders-card.component.css']
})
export class RemindersCardComponent implements OnInit {
  @Input() reminder: Reminder;

  constructor(private alertify: AlertifyService, private pushNotificationService: PushNotificationService) { }

  ngOnInit() {
    const j = Schedule.scheduleJob(this.reminder.responseTime, () => {
      this.alertify.warning("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    });

    const i = Schedule.scheduleJob(this.reminder.responseTime, () => {
      this.pushNotification();
    });

  }

  pushNotification() {
    const title = this.reminder.text;
    const options = new PushNotificationOptions();
    options.body = '';

    this.pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
        console.log('onshow');
        setTimeout(() => {
          notif.notification.close();
        }, 5000);
      }
      if (notif.event.type === 'click') {
        console.log('click');
        notif.notification.close();
      }
      if (notif.event.type === 'close') {
        console.log('close');
      }
    },
      (err) => {
        console.log(err);
      });
  }

}
