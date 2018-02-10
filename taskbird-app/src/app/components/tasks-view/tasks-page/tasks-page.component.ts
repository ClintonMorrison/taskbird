import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/item.service';
import { Task } from '../../../models/item';

@Component({
  selector: 'taskbird-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {

  constructor(private itemService: TaskService) { }
  
  tasks: Task[];

  getTasks(): void {
    this.itemService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  ngOnInit() {
    this.getTasks();
  }

}
