import { Component, OnInit } from '@angular/core';
import { Month, Date } from '../../../models/dates';
import { TaskService } from '../../../services/item.service';
import { BrowserService } from '../../../browser.service';
import 'rxjs/add/operator/first';
import * as _ from 'lodash';
import { utc } from 'moment';
import { Subscription } from 'rxjs/Subscription';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: "calendar-page",
  templateUrl: "./calendar-page.component.html",
  styleUrls: ["./calendar-page.component.scss"]
})
export class CalendarPageComponent implements OnInit {
  month: Month = Month.fromMoment(utc());

  selectedDay: Date;
  taskIds: number[];
  sub: Subscription;

  constructor(
    private taskService: TaskService,
    private filterService: FilterService,
    private browserService: BrowserService
  ) {}

  
  goToPrevious() {
    this.month = this.month.getPrevious();
  }

  goToNext() {
    this.month = this.month.getNext();
  }

  getLongTitle() {
    return this.month.toMoment().format("MMMM, YYYY");
  }

  getShortTitle() {
    return this.month.toMoment().format("MMM, YYYY");
  }

  getSelectedDayTitle() {
    if (this.selectedDay) {
      return this.selectedDay.toMoment().format('MMMM Do');
    }
  }

  handleDateSelected(date) {
    if (date.equals(this.selectedDay)) {
      this.selectedDay = null;
    } else {
      this.selectedDay = date;
    }

    this.filterService.setActiveTask(undefined);
    this.getTasksForSelectedDay();
  }

  ngOnInit() {
    this.filterService.setActiveTask(undefined);

    this.sub = this.taskService.getTasksById().subscribe(
      () => this.getTasksForSelectedDay()
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getTasksForSelectedDay() {
    if (!this.selectedDay) {
      this.taskIds = [];
      return;
    }

    this.taskService.groupTasksByDayDue().first().subscribe((tasksByDay) => {
      const tasks = tasksByDay[this.selectedDay.toString()];
      this.taskIds = _.map(tasks, task => task.id);
      this.browserService.scrollTo('#calendar-tasks');
    });
  }
}
