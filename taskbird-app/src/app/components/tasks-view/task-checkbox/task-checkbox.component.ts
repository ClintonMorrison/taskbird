import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/item';
import { TaskService } from '../../../services/item.service';

@Component({
  selector: 'taskbird-task-checkbox',
  templateUrl: './task-checkbox.component.html',
  styleUrls: ['./task-checkbox.component.scss']
})
export class TaskCheckboxComponent implements OnInit {

  @Input()
  task: Task;

  @Input()
  showLabel: boolean = false;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  getColor() {
    if (this.task.priority === 'High') {
      return 'red';
    } else if (this.task.priority === 'Low') {
      return 'green';
    }

    return 'black';
  }

  handleClick(e) {
    e.preventDefault();
    const updatedTask = { ...this.task, done: !this.task.done};
    this.taskService.updateTask(updatedTask);
  }
}
