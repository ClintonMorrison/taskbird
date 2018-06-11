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

  priorityOptions = [
    { name: 'Low', value: 'Low', icon: 'green circle' },
    { name: 'Normal', value: 'Normal', icon: 'black circle' },
    { name: 'High', value: 'High', icon: 'red circle' }
  ];


  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  handleChange(priority: string) {
    const updatedTask = { ...this.task, priority };
    this.taskService.updateTask(updatedTask);
  }
}
