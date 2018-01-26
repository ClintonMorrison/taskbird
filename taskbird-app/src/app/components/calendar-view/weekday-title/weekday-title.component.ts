import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'weekday-title',
  templateUrl: './weekday-title.component.html',
  styleUrls: ['./weekday-title.component.scss']
})
export class WeekdayTitleComponent implements OnInit {

  @Input()
  private weekday : String;

  constructor() { }

  private getShortName() {
    return this.weekday.slice(0, 1);
  }

  private getMediumName() {
    return this.weekday.slice(0, 3);
  }

  private getFullName() {
    return this.weekday;
  }

  ngOnInit() {
  }

}
