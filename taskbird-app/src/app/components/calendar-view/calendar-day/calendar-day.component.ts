import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../models/item';
import { Date } from '../../../models/dates';
import { TaskService } from '../../../services/item.service';


@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {

  @Input()
  private active: boolean;

  @Input()
  private selected: boolean;

  @Input()
  private today: boolean;

  @Input()
  tasks: Task[];

  @Input()
  date: Date;

  @Output()
  dateSelected = new EventEmitter<Date>();

  private getClass(): string {
    return this.active ? '' : 'inactive';
  }

  private handleClick(e) {
    e.preventDefault();
    this.dateSelected.emit(this.date);
  }
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

}
