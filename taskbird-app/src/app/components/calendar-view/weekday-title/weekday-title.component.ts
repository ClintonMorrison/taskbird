import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'taskbird-weekday-title',
  templateUrl: './weekday-title.component.html',
  styleUrls: ['./weekday-title.component.scss']
})
export class WeekdayTitleComponent implements OnInit {

  @Input()
  private weekday : String;

  constructor() { }

  getShortName() {
    return this.weekday.slice(0, 1);
  }

  getMediumName() {
    return this.weekday.slice(0, 3);
  }

  getFullName() {
    return this.weekday;
  }

  ngOnInit() {
  }

}
