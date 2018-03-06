import { Component, OnInit, Input } from '@angular/core';
import { uniqueId } from 'lodash';

import { Task } from '../../../models/item';
import { FilterService } from '../../../services/filter.service';

declare var $: any;

@Component({
  selector: 'taskbird-task-sidebar',
  templateUrl: './task-sidebar.component.html',
  styleUrls: ['./task-sidebar.component.scss']
})
export class TaskSidebarComponent implements OnInit {

  @Input()
  task: Task;

  constructor(
    private filterService: FilterService
  ) {
  }

  ngOnInit() {
  }
}
