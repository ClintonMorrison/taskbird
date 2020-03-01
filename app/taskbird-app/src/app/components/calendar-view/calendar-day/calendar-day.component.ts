import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../models/item';
import { Date } from '../../../models/dates';
import { TaskService } from '../../../services/task.service';
import * as _ from 'lodash';


@Component({
  selector: 'taskbird-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {

  @Input()
  active: boolean;

  @Input()
  selected: boolean;

  @Input()
  today: boolean;

  @Input()
  tasks: Task[];

  @Input()
  date: Date;

  @Output()
  dateSelected = new EventEmitter<Date>();

  getClass(): string {
    return this.active ? '' : 'inactive';
  }

  handleClick(e) {
    e.preventDefault();
    this.dateSelected.emit(this.date);
  }
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  anyUndone(tasks: Task[]) {
    return _.some(tasks, task => !task.done);
  }

}
