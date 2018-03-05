import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/item';

declare var window: any;

@Component({
  selector: 'taskbird-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input()
  taskIds: number[];

  numberToShow: number;

  @Input()
  showCompletedToggle: boolean;

  constructor() {
  }

  ngOnInit() {
    this.numberToShow = 10;
  }

  showMore() {
    this.numberToShow += 10;
  }

}
