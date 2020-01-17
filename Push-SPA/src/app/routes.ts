import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { RemindersListComponent } from './reminders/reminders-list/reminders-list.component';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    // { path: 'reminders/', component: RemindersListComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'reminders', component: RemindersListComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];