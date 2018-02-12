import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks-view/tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/base/button/button.component';
import { NavComponent } from './components/base/nav/nav.component';
import { TaskDetailComponent } from './components/tasks-view/task-detail/task-detail.component';

import { TaskService } from './services/item.service';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageService } from './services/message.service';
import { DateService } from './services/date.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './components/dashboard-view/dashboard/dashboard.component';
import { TaskStatisticsComponent } from './components/dashboard-view/task-statistics/task-statistics.component';
import { TaskItemComponent } from './components/tasks-view/task-item/task-item.component';
import { CalendarComponent } from './components/calendar-view/calendar/calendar.component';
import { CalendarPageComponent } from './components/calendar-view/calendar-page/calendar-page.component';
import { WeekdayTitleComponent } from './components/calendar-view/weekday-title/weekday-title.component';
import { CalendarDayComponent } from './components/calendar-view/calendar-day/calendar-day.component';
import { CalendarTaskComponent } from './components/calendar-view/calendar-task/calendar-task.component';
import { ProjectIconComponent } from './components/tasks-view/project-icon/project-icon.component';
import { ProjectFilterComponent } from './components/tasks-view/project-filter/project-filter.component';
import { TasksPageComponent } from './components/tasks-view/tasks-page/tasks-page.component';
import { TaskSidebarComponent } from './components/tasks-view/task-sidebar/task-sidebar.component';
import { StatusLabelComponent } from './components/tasks-view/status-label/status-label.component';
import { ProjectDropdownComponent } from './components/tasks-view/project-dropdown/project-dropdown.component';
import { ProjectService } from './services/project.service';
import { FilterService } from './services/filter.service';
import { ShowCompletedToggleComponent } from './components/tasks-view/show-completed-toggle/show-completed-toggle.component';
import { FilteringControlsComponent } from './components/tasks-view/filtering-controls/filtering-controls.component';
import { SearchBarComponent } from './components/tasks-view/search-bar/search-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
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
    ProjectIconComponent,
    ProjectFilterComponent,
    TasksPageComponent,
    TaskSidebarComponent,
    StatusLabelComponent,
    ProjectDropdownComponent,
    ShowCompletedToggleComponent,
    FilteringControlsComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
providers: [ TaskService, ProjectService, MessageService, DateService, FilterService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
