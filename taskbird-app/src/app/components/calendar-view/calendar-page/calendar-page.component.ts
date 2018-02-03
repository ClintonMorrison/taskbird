import { Component, OnInit } from '@angular/core';
import { Month } from "../../../models/dates";

@Component({
  selector: 'calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss']
})
export class CalendarPageComponent implements OnInit {

  private month : Month = { year: '2018', month: '01' };

  constructor() { }

  ngOnInit() {
  }

}
