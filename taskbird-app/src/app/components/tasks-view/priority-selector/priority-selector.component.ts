import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../services/item.service';
import { Task } from '../../../models/item';

@Component({
  selector: 'taskbird-priority-selector',
  templateUrl: './priority-selector.component.html',
  styleUrls: ['./priority-selector.component.scss']
})
export class PrioritySelectorComponent implements OnInit {

  @Input()
  task: Task;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  select(priority: string) {
    console.log('set priority -->', priority);
    const updatedTask = { ...this.task, priority };
    this.taskService.updateTask(updatedTask);
  }

}
