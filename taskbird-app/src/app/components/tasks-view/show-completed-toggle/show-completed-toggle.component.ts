import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../../services/filter.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'taskbird-show-completed-toggle',
  template: `
    <button
      *ngIf="shouldShowCompleted() | async"
      (click)="toggleFilter(false)"
      class="ui primary basic button">
      Hide Completed Tasks
    </button>
    <button
      *ngIf="!(shouldShowCompleted() | async)"
      (click)="toggleFilter(true)"
      class="ui primary basic button">
      Show Completed Tasks
    </button>
  `,
  styles: []
})
export class ShowCompletedToggleComponent implements OnInit {

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit() {
  }

  toggleFilter(showCompleted: boolean) {
    this.filterService.setShowCompletedTasks(showCompleted);
  }

  shouldShowCompleted(): Observable<Boolean> {
    return this.filterService.getShowCompletedTasks();
  }

}
