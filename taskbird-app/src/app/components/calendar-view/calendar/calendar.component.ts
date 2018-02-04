import { Component, OnInit, Input } from '@angular/core';
import { CalendarDay } from '../../../models/calendar-day';
import { utc, Moment } from 'moment';
import { Date, Month } from '../../../models/dates';
import { DateService } from '../../../services/date.service';
import { TaskService } from '../../../services/item.service';
import { StringTaskMap } from '../../../models/item';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input()
  private month: Month;

  private daysOfWeek: String[];

  constructor(
    private dateService: DateService,
    private taskService: TaskService
  ) {
    this.daysOfWeek = dateService.getDaysOfWeek();
  }

  private getCalendarDays(): CalendarDay[] {
    const dates = this.dateService.getDatesForCalendar(this.month);

    const calendarDays = [];

    this.taskService.groupTasksByDayDue().subscribe((tasksByDay) => {
      for (const date of dates) {
        const tasksOnDate = tasksByDay[date.toString()];
        const calendarDay = new CalendarDay(date, tasksOnDate ? tasksOnDate : []);
        calendarDays.push(calendarDay);
      }
    });

    return calendarDays;
  }

  getWeeks () {
    const calendarDays = this.getCalendarDays();
    return this.dateService.groupIntoWeeks(calendarDays);
  }

  dayIsInCurrentMonth(date: Date): boolean {
    return date.month === this.month.month;
  }

  ngOnInit() {
  }

}
