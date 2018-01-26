import { Component, OnInit, Input } from '@angular/core';
import { CalendarDay } from "../../../models/calendar-day";
import { utc, Moment } from "moment";
import { Month } from '../../../models/dates';
import { DateService } from "../../../services/date.service";

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input()
  private month : Month;

  private daysOfWeek : String[];

  constructor(
    private dateService : DateService
  ) {
    this.daysOfWeek = dateService.getDaysOfWeek();
  }

  private getCalendarDays() : CalendarDay[] {
    const dates = this.dateService.getDatesForCalendar(this.month);

    const calendarDays = [];

    for (let date of dates) {
      // TODO: get list of tasks for day
      calendarDays.push(new CalendarDay(date));
    }

    return calendarDays;
  }

  getWeeks () {
    const calendarDays = this.getCalendarDays();
    return this.dateService.groupIntoWeeks(calendarDays);
  }

  ngOnInit() {
  }

}
