import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksPageComponent } from './components/tasks-view/tasks-page/tasks-page.component';
import { CalendarPageComponent } from "./components/calendar-view/calendar-page/calendar-page.component";
import { AnalyticsPageComponent } from './components/analytics-view/analytics-page/analytics-page.component';
import { ProjectsPageComponent } from './components/projects-view/projects-page/projects-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksPageComponent },
  { path: 'tasks/:projectId', component: TasksPageComponent },
  { path: 'calendar', component: CalendarPageComponent },
  { path: 'calendar/:year/:month', component: CalendarPageComponent },
  { path: 'projects', component: ProjectsPageComponent },
  { path: 'analytics', component: AnalyticsPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
