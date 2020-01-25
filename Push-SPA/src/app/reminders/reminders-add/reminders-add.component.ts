import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ReminderService } from 'src/app/_services/reminder.service';

@Component({
  selector: 'app-reminders-add',
  templateUrl: './reminders-add.component.html',
  styleUrls: ['./reminders-add.component.css']
})

export class RemindersAddComponent implements OnInit {
  @Output() cancelAdding = new EventEmitter();
  @Output() addedReminder = new EventEmitter();
  reminderForCreate: any = {};

  constructor(private authService: AuthService, private reminderService: ReminderService) { }

  ngOnInit() {
  }

  addReminder() {
    this.reminderService.addReminder(this.authService.decodedToken.nameid, this.reminderForCreate).subscribe(() => {
      this.reminderForCreate = {};
      this.addedReminder.emit(this.reminderForCreate);
    }, error => {
    });
  }

  cancel() {
    this.cancelAdding.emit(false);
  }
}
