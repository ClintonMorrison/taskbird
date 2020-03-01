import { Task } from './item';
import { Date } from './dates';

export class CalendarDay {
  public date: Date;
  public tasks: Task[] = [];

  constructor(date: Date, tasks = []) {
    this.date = date;
    this.tasks = tasks;
  }
}
