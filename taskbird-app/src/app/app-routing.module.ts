import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksPageComponent } from './components/tasks-view/tasks-page/tasks-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskDetailComponent } from './components/tasks-view/task-detail/task-detail.component';
import { CalendarPageComponent } from "./components/calendar-view/calendar-page/calendar-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TasksPageComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: 'calendar', component: CalendarPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
