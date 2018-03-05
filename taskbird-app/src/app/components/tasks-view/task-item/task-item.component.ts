import { Component, OnInit, Input , ViewChild } from '@angular/core';
import { Task } from "../../../models/item";
import { TaskSidebarComponent } from '../task-sidebar/task-sidebar.component';
import { utc } from 'moment';
import { TaskService } from '../../../services/item.service';
import { Subscription } from 'rxjs/Subscription';
import { SidebarComponent } from '../../base/sidebar/sidebar.component';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input()
  taskId: number;

  task: Task;

  private sub: Subscription;

  @ViewChild(SidebarComponent)
  private sidebar: SidebarComponent;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.sub = this.taskService.getTaskById(String(this.taskId))
      .subscribe(task => this.task = task);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
