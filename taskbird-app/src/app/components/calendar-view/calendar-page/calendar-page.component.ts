import { Component, OnInit } from '@angular/core';
import { Month } from '../../../models/dates';

@Component({
  selector: "calendar-page",
  templateUrl: "./calendar-page.component.html",
  styleUrls: ["./calendar-page.component.scss"]
})
export class CalendarPageComponent implements OnInit {
  month: Month = new Month("2017", "12");

  constructor() {}

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

  ngOnInit() {}
}
