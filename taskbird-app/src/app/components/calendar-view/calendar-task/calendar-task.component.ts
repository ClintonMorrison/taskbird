import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/item';

@Component({
  selector: 'calendar-task',
  templateUrl: './calendar-task.component.html',
  styleUrls: ['./calendar-task.component.scss']
})
export class CalendarTaskComponent implements OnInit {

  @Input()
  private task: Task;

  constructor() { }

  ngOnInit() {
  }

}
