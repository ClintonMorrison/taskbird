import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { Tasks } from './components/tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/base/button/button.component';
import { NavComponent } from './components/base/nav/nav.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

import { ItemService } from './services/item.service';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageService } from './services/message.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskStatisticsComponent } from './components/task-statistics/task-statistics.component';
import { TaskItemComponent } from './components/task-item/task-item.component';


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
    TaskItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
providers: [ ItemService, MessageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
