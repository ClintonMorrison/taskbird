import { Component, OnInit, Input , ViewChild } from '@angular/core';
import { Task } from "../../../models/item";
import { TaskSidebarComponent } from '../task-sidebar/task-sidebar.component';
import { utc } from 'moment';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input()
  task : Task;

  @ViewChild(TaskSidebarComponent)
  private sidebar: TaskSidebarComponent;

  constructor() { }

  ngOnInit() {
  }

  onSelect(event) {
    event.preventDefault();
    this.sidebar.openSidebar();
  }

  getDateDue(): string {
    return this.task.date_due ? utc(this.task.date_due).format('MMM DD') : ''
  }

  getDescription(): string {
    return this.task.description;
  }
}
