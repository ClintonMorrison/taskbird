import { Component, OnInit } from '@angular/core';
import { Month, Date } from '../../../models/dates';
import { Task } from '../../../models/item';
import { TaskService } from '../../../services/item.service';
import { Observable } from 'rxjs/Observable';
import { BrowserService } from '../../../browser.service';

@Component({
  selector: "calendar-page",
  templateUrl: "./calendar-page.component.html",
  styleUrls: ["./calendar-page.component.scss"]
})
export class CalendarPageComponent implements OnInit {
  month: Month = new Month("2017", "12");

  private selectedDay: Date;
  private tasks: Task[];

  constructor(
    private taskService: TaskService,
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

    this.getTasksForSelectedDay();
  }

  ngOnInit() {
  }

  getTasksForSelectedDay() {
    if (!this.selectedDay) {
      this.tasks = [];
      return;
    }

    return this.taskService.groupTasksByDayDue().subscribe((tasksByDay) => {
      this.tasks = tasksByDay[this.selectedDay.toString()];

      if (this.tasks && this.tasks.length > 0) {
        setTimeout(() => {
          this.browserService.scrollToBottom();
        }, 0);
      }
    });
  }
}
