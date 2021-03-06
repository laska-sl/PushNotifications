import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Reminder } from '../_models/reminder';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getReminders(userId: number): Observable<Reminder[]> {
    return this.http.get<Reminder[]>(this.baseUrl + 'users/' + userId + '/reminders');
  }

  getReminder(userId: number, id: number): Observable<Reminder> {
    return this.http.get<Reminder>(this.baseUrl + 'users/' + userId + '/reminders/' + id);
  }

  addReminder(userId: number, reminder: Reminder) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/reminders/', reminder);
  }

  updateReminder(userId: number, id: number, reminder: Reminder) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/reminders/' + id, reminder);
  }

  deleteReminder(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/reminders/' + id);
  }
}
