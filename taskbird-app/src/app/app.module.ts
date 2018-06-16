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
import { ProjectService } from './services/project.service';
import { FilterService } from './services/filter.service';
import { ShowCompletedToggleComponent } from './components/tasks-view/show-completed-toggle/show-completed-toggle.component';
import { FilteringControlsComponent } from './components/tasks-view/filtering-controls/filtering-controls.component';
import { SearchBarComponent } from './components/tasks-view/search-bar/search-bar.component';
import { SortDropdownComponent } from './components/tasks-view/sort-dropdown/sort-dropdown.component';
import { PrioritySelectorComponent } from './components/tasks-view/priority-selector/priority-selector.component';
import { AnalyticsPageComponent } from './components/analytics-view/analytics-page/analytics-page.component';
import { GraphComponent } from './components/analytics-view/graph/graph.component';
import { ProductivityGraphComponent } from './components/analytics-view/productivity-graph/productivity-graph.component';
import { ProjectsGraphComponent } from './components/analytics-view/projects-graph/projects-graph.component';
import { WeekDayGraphComponent } from './components/analytics-view/week-day-graph/week-day-graph.component';
import { ProjectCompletionTimeGraphComponent } from './components/analytics-view/project-completion-time-graph/project-completion-time-graph.component';
import { CreateTaskButtonComponent } from './components/tasks-view/create-task-button/create-task-button.component';
import { ProjectsPageComponent } from './components/projects-view/projects-page/projects-page.component';
import { ProjectItemComponent } from './components/projects-view/project-item/project-item.component';
import { ProjectListComponent } from './components/projects-view/project-list/project-list.component';
import { ProjectEditorComponent } from './components/projects-view/project-editor/project-editor.component';
import { ProjectFieldComponent } from './components/projects-view/project-field/project-field.component';
import { ProjectProgressBarComponent } from './components/projects-view/project-progress-bar/project-progress-bar.component';
import { ProjectSelectorComponent } from './components/tasks-view/project-selector/project-selector.component';
import { TaskCheckboxComponent } from './components/tasks-view/task-checkbox/task-checkbox.component';
import { BrowserService } from './browser.service';
import { SidebarComponent } from './components/base/sidebar/sidebar.component';
import { DueDatePickerComponent } from './components/tasks-view/due-date-picker/due-date-picker.component';
import { ModalComponent } from './components/base/modal/modal.component';
import { ActiveTaskViewerComponent } from './components/tasks-view/active-task-viewer/active-task-viewer.component';
import { ActiveProjectViewerComponent } from './components/projects-view/active-project-viewer/active-project-viewer.component';
import { ProjectDetailComponent } from './components/projects-view/project-detail/project-detail.component';
import { ColorPickerComponent } from './components/projects-view/color-picker/color-picker.component';
import { IconPickerComponent } from './components/projects-view/icon-picker/icon-picker.component';
import { NewProjectButtonComponent } from './components/projects-view/new-project-button/new-project-button.component';
import { DeleteTaskButtonComponent } from './components/tasks-view/delete-task-button/delete-task-button.component';
import { DeleteProjectButtonComponent } from './components/projects-view/delete-project-button/delete-project-button.component';
import { ApiService } from './api.service';
import { LoadingDimmerComponent } from './components/base/loading-dimmer/loading-dimmer.component';
import { DropdownComponent } from './components/base/dropdown/dropdown.component';
import { SavingIndicatorComponent } from './components/base/saving-indicator/saving-indicator.component';


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
    ShowCompletedToggleComponent,
    FilteringControlsComponent,
    SearchBarComponent,
    SortDropdownComponent,
    PrioritySelectorComponent,
    AnalyticsPageComponent,
    GraphComponent,
    ProductivityGraphComponent,
    ProjectsGraphComponent,
    WeekDayGraphComponent,
    ProjectCompletionTimeGraphComponent,
    CreateTaskButtonComponent,
    ProjectsPageComponent,
    ProjectItemComponent,
    ProjectListComponent,
    ProjectEditorComponent,
    ProjectFieldComponent,
    ProjectProgressBarComponent,
    ProjectSelectorComponent,
    TaskCheckboxComponent,
    SidebarComponent,
    DueDatePickerComponent,
    ModalComponent,
    ActiveTaskViewerComponent,
    ActiveProjectViewerComponent,
    ProjectDetailComponent,
    ColorPickerComponent,
    IconPickerComponent,
    NewProjectButtonComponent,
    DeleteTaskButtonComponent,
    DeleteProjectButtonComponent,
    LoadingDimmerComponent,
    DropdownComponent,
    SavingIndicatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
providers: [
  ApiService,
  TaskService,
  ProjectService,
  MessageService,
  DateService,
  FilterService,
  BrowserService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
