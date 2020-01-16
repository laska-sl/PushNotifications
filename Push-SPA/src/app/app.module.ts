import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { PushNotificationService } from 'ngx-push-notifications';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_services/alertify.service';
import { appRoutes } from './routes';
import { RemindersListComponent } from './reminders/reminders-list/reminders-list.component';
import { PushNotificationsModule } from 'ng-push';
import { AuthGuard } from './guards/auth.guard';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { ReminderService } from './_services/reminder.service';
import { RemindersCardComponent } from './reminders/reminders-card/reminders-card.component';
import { RemindersAddComponent } from './reminders/reminders-add/reminders-add.component';



export function tokenGetter() {
   return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig {
   overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
   };
}

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      NavComponent,
      RegisterComponent,
      RemindersListComponent,
      RemindersCardComponent,
      RemindersAddComponent
   ],
   imports: [
      BrowserModule,
      PushNotificationsModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth'],
         }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      ReminderService,
      AuthGuard,
      PushNotificationService,
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
