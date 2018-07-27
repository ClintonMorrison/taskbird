import { Component, OnInit } from '@angular/core';
import { Month, Date } from '../../../models/dates';
import { TaskService } from '../../../services/task.service';
import { BrowserService } from '../../../browser.service';
import 'rxjs/add/operator/first';
import * as _ from 'lodash';
import { utc } from 'moment';
import { Subscription } from 'rxjs/Subscription';
import { FilterService } from '../../../services/filter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "taskbird-calendar-page",
  templateUrl: "./calendar-page.component.html",
  styleUrls: ["./calendar-page.component.scss"]
})
export class CalendarPageComponent implements OnInit {
  month: Month;

  selectedDay: Date;
  taskIds: number[];
  taskSub: Subscription;
  routeSub: Subscription;

  previousMonthRoute: string;
  nextMonthRoute: string;

  constructor(
    private taskService: TaskService,
    private filterService: FilterService,
    private browserService: BrowserService,
    private route: ActivatedRoute
  ) {
    this.month = Month.fromMoment(utc());
  }

  
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
    this.getTasksForSelectedDay(true);
  }

  ngOnInit() {
    this.filterService.setActiveTask(undefined);

    this.taskSub = this.taskService.getTasksById().subscribe(
      () => this.getTasksForSelectedDay(false)
    );

    this.updateNavigationRoutes(this.month);

    this.routeSub = this.route.params.subscribe((params) => {
      if (params.year && params.month) {
        this.month = new Month(params.year, params.month);
        this.updateNavigationRoutes(this.month);
      }
    });
  }

  updateNavigationRoutes(month: Month) {
    const previous = month.getPrevious();
    const next = month.getNext();
    this.previousMonthRoute = `/calendar/${previous.year}/${previous.month}`;
    this.nextMonthRoute = `/calendar/${next.year}/${next.month}`;
  }

  ngOnDestroy() {
    this.taskSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

  getTasksForSelectedDay(scroll: boolean) {
    if (!this.selectedDay) {
      this.taskIds = [];
      return;
    }

    this.taskService.groupTasksByDayDue().first().subscribe((tasksByDay) => {
      const tasks = tasksByDay[this.selectedDay.toString()];
      this.taskIds = _.map(tasks, task => task.id);

      if (scroll) {
        this.browserService.scrollTo('#calendar-tasks');
      }
    });
  }
}
