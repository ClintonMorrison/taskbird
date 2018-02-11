import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/item.service';
import { Task } from '../../../models/item';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'taskbird-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private filterService: FilterService
  ) {}
  
  tasks: Task[] = [];
  unfilteredTasks: Task[] = [];

  subscribeToTasks(): void {
    this.filterService.getFilteredTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  subscribeToUnfilteredTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.unfilteredTasks = tasks);
  }

  ngOnInit() {
    this.subscribeToTasks();
    this.subscribeToUnfilteredTasks();
  }

}
