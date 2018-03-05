import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarDay } from '../../../models/calendar-day';
import { utc, Moment } from 'moment';
import { Date, Month } from '../../../models/dates';
import { DateService } from '../../../services/date.service';
import { TaskService } from '../../../services/item.service';
import { StringTaskMap } from '../../../models/item';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input()
  month: Month;

  @Output()
  dateSelected = new EventEmitter<Date>();

  @Input()
  private selectedDay: Date;

  daysOfWeek: String[];

  days: CalendarDay[];
  weeks: CalendarDay[][];
  sub: Subscription;
  tasksByDayDue: StringTaskMap = {};

  constructor(
    private dateService: DateService,
    private taskService: TaskService
  ) {
    this.daysOfWeek = dateService.getDaysOfWeek();
  }

  dayIsInCurrentMonth(date: Date): boolean {
    return date.month === this.month.month && date.year === this.month.year;
  }

  dayIsSelected(date: Date): boolean {
    return date.equals(this.selectedDay);
  }

  dayIsToday(date: Date): boolean {
    return date.equals(Date.fromMoment(utc()));
  }

  handleDateSelected(date) {
    this.dateSelected.emit(date);
  }

  ngOnInit() {
    this.refreshCalendar();
    this.sub = this.taskService.groupTasksByDayDue()
      .subscribe(tasksByDayDue => {
        this.tasksByDayDue = tasksByDayDue;
        this.refreshCalendar();
      });
  }

  ngOnChanges(changes) {
    if (changes.month) {
      this.refreshCalendar();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private refreshCalendar() {
    const dates = this.dateService.getDatesForCalendar(this.month);

    const calendarDays = [];

    for (const date of dates) {
      const tasksOnDate = this.tasksByDayDue[date.toString()];
      const calendarDay = new CalendarDay(date, tasksOnDate ? tasksOnDate : []);
      calendarDays.push(calendarDay);
    }

    this.days = calendarDays;
    this.weeks = this.dateService.groupIntoWeeks(this.days);
  }
}
