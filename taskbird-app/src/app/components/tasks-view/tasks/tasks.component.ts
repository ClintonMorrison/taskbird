import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/item';

@Component({
  selector: 'taskbird-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input()
  taskIds: number[];

  numberToShow: number;

  selectedTask: Task;

  @Input()
  showCompletedToggle: boolean;

  constructor() { }

  onSelect(task: Task): void {
    this.selectedTask = task;
  }

  ngOnInit() {
    this.numberToShow = 10;
  }

  showMore() {
    this.numberToShow += 10;
  }

}
