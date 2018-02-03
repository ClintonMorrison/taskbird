import { Component, OnInit , Input} from '@angular/core';
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
  private tasks: Task[];

  @Input()
  private date: Date;

  private getClass(): string {
    return this.active ? '' : 'inactive';
  }

  private handleClick(e) {
    e.preventDefault();
    console.log('Clicked', this.date);
  }
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

}
