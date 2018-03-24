import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../services/item.service';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'taskbird-create-task-button',
  template: `
  <button (click)="click()" class="ui labeled primary icon button">
    <i class="plus icon"></i>
    New Task
  </button>
  `,
  styles: []
})
export class CreateTaskButtonComponent implements OnInit {

  @Input()
  fields: object;

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit() {
  }

  click() {
    this.filterService.createTaskMatchingFilters(this.fields || {});
  }r

}
