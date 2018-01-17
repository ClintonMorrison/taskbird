import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tasks }      from './components/tasks/tasks.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { TaskDetailComponent }  from './components/task-detail/task-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'items', component: Tasks },
  { path: 'item/:id', component: TaskDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
