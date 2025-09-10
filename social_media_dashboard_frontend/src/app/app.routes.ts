import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AccountsComponent } from './features/accounts/accounts.component';
import { SchedulerComponent } from './features/scheduler/scheduler.component';
import { CalendarComponent } from './features/calendar/calendar.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { PostsComponent } from './features/posts/posts.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, title: 'Dashboard' },
  { path: 'accounts', component: AccountsComponent, title: 'Accounts' },
  { path: 'create', component: SchedulerComponent, title: 'Create & Schedule' },
  { path: 'calendar', component: CalendarComponent, title: 'Calendar' },
  { path: 'analytics', component: AnalyticsComponent, title: 'Analytics' },
  { path: 'posts', component: PostsComponent, title: 'Posts' },
  { path: '**', redirectTo: '' },
];
