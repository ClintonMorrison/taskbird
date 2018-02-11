import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/item.service';
import { Task } from '../../../models/item';

@Component({
  selector: 'app-task-statistics',
  templateUrl: './task-statistics.component.html',
  styleUrls: ['./task-statistics.component.scss']
})
export class TaskStatisticsComponent implements OnInit {

  tasksCreated: number;
  tasksCompleted: number;
  tasksOpen: number;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.updateTaskCounts(tasks);
    })
  }

  private updateTaskCounts(tasks: Task[]) {
    let created = 0;
    let completed = 0;
    let open = 0;

    for (const task of tasks) {
      created += 1;

      if (task.done == true) {
        completed += 1;
      } else {
        open += 1;
      }
    }

    this.tasksCreated = created;
    this.tasksCompleted = completed;
    this.tasksOpen = open;
  }

}
