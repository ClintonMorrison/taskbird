import { Injectable } from '@angular/core';
import { utc, Moment } from 'moment';
import { Month, Date } from '../models/dates';

@Injectable()
export class DateService {

  private daysOfWeek : String[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  constructor() {
  }

  public getDatesInRange(start : Moment, end : Moment) : Date[] {
    let currentDay = start.clone();

    const dates = [];

    while (currentDay.diff(end) <= 0) {
      dates.push(this.momentToDate(currentDay));
      currentDay = currentDay.add(1, 'days');
    }

    return dates;
  }

  public getDaysOfWeek() {
    return this.daysOfWeek;
  }

  public getDatesForCalendar(month : Month) : Date[] {
    const start = this.getStartOfMonth(month);
    const end = this.getEndOfMonth(month);

    const dates : Date[] = this.getDatesInRange(start, end);

    // Add days before start of month that appear on calendar
    if (!this.isFirstOfWeek(start)) {
      let currentDay = start.clone();
      while (!this.isFirstOfWeek(currentDay)) {
        currentDay = currentDay.subtract(1, 'days');
        dates.unshift(this.momentToDate(currentDay));
      }
    }

    // Add days after end of month that appear on calendar
    if (!this.isLastDayOfWeek(end)) {
      let currentDay = end.clone();
      while (!this.isLastDayOfWeek(currentDay)) {
        currentDay = currentDay.add(1, 'days');
        dates.push(this.momentToDate(currentDay));
      }
    }

    return dates;
  }

  public groupIntoWeeks(items) {
    const weeks = [];
    items = items.slice();

    while (items.length > 0) {
      weeks.push(items.splice(0, 7));
    }

    return weeks;
  }

  private getStartOfMonth(month : Month) : Moment {
    return utc(`${month.year}-${month.month}`, 'YYYY-MM');
  }

  private getEndOfMonth(month : Month): Moment {
    return this.getStartOfMonth(month).endOf("month");
  }

  private momentToDate(moment : Moment) : Date {
    return {
      year: moment.format('YYYY'),
      month: moment.format('MM'),
      day: moment.format('D')
    };
  }

  private isFirstOfWeek(moment : Moment) : boolean {
    return moment.format('E') === '7';
  }

    private isLastDayOfWeek(moment : Moment) : boolean {
    return moment.format('E') === '6';
  }
}
