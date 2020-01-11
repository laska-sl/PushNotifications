import { Component, OnInit, Input } from '@angular/core';
import { Reminder } from 'src/app/_models/reminder';

@Component({
  selector: 'app-reminders-card',
  templateUrl: './reminders-card.component.html',
  styleUrls: ['./reminders-card.component.css']
})
export class RemindersCardComponent implements OnInit {
  @Input() reminder: Reminder;

  constructor() { }

  ngOnInit() {
  }

}
