import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PushNotificationsModule } from 'ng-push'; //import the module

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { RemindersEditComponent } from './reminders/reminders-edit/reminders-edit.component';
import { RemindersListComponent } from './reminders/reminders-list/reminders-list.component';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      NavComponent,
      RegisterComponent,
      RemindersEditComponent,
      RemindersListComponent
   ],
   imports: [
      BrowserModule,
      PushNotificationsModule //addittoimports
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
