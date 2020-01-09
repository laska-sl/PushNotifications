import { Component } from '@angular/core';
import { PushNotificationsService } from 'ng-push';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Web push Notifications!';
  constructor(private pushNotifications: PushNotificationsService) {
    this.pushNotifications.requestPermission();
  }

  notify() {
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
      const notification = new Notification('Hi there!');
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          var notification = new Notification('Hi there!');
        }
      });
    }
  }
}