import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/item';

@Component({
  selector: 'taskbird-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input()
  tasks: Task[];

  numberToShow: number;

  selectedTask: Task;

  constructor() { }

  onSelect(task: Task): void {
    this.selectedTask = task;
  }

  ngOnInit() {
    this.numberToShow = 25;
  }

  showMore() {
    this.numberToShow += 25;
  }

}