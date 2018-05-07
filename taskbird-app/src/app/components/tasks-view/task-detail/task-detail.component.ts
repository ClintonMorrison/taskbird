import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/item';
import { TaskService } from '../../../services/item.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'taskbird-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  @Input() 
  taskId: number;

  task: Task;

  private taskSub: Subscription;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.refreshTask();
  }

  ngOnChanges(changes) {
    if (changes.taskId) {
      this.refreshTask();
    }
  }

  ngOnDestroy() {
    if (this.taskSub) {
      this.taskSub.unsubscribe();
    }
  }

  updateTask() {
    this.taskService.updateTask(this.task);
  }

  private refreshTask() {
    if (this.taskSub) {
      this.taskSub.unsubscribe();
    }

    this.taskSub = this.taskService.getTaskById(String(this.taskId))
      .subscribe(task => this.task = task);
  }

}
