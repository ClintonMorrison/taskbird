import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { Tasks } from './components/tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/base/button/button.component';
import { NavComponent } from './components/base/nav/nav.component';
import { TaskDetailComponent } from './components/tasks-view/task-detail/task-detail.component';

import { TaskService } from './services/item.service';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageService } from './services/message.service';
import { DateService } from './services/date.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskStatisticsComponent } from './components/task-statistics/task-statistics.component';
import { TaskItemComponent } from './components/tasks-view/task-item/task-item.component';
import { CalendarComponent } from './components/calendar-view/calendar/calendar.component';
import { CalendarPageComponent } from './components/calendar-view/calendar-page/calendar-page.component';
import { WeekdayTitleComponent } from './components/calendar-view/weekday-title/weekday-title.component';
import { CalendarDayComponent } from './components/calendar-view/calendar-day/calendar-day.component';
import { CalendarTaskComponent } from './components/calendar-view/calendar-task/calendar-task.component';
import { ProjectIconComponent } from './components/tasks-view/project-icon/project-icon.component';


@NgModule({
  declarations: [
    AppComponent,
    Tasks,
    ButtonComponent,
    NavComponent,
    TaskDetailComponent,
    MessagesComponent,
    DashboardComponent,
    TaskStatisticsComponent,
    TaskItemComponent,
    CalendarComponent,
    CalendarPageComponent,
    WeekdayTitleComponent,
    CalendarDayComponent,
    CalendarTaskComponent,
    ProjectIconComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
providers: [ TaskService, MessageService, DateService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
