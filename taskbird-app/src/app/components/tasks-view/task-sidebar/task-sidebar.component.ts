import { Component, OnInit, Input } from '@angular/core';
import { uniqueId } from 'lodash';

import { Task } from '../../../models/item';

declare var $: any;

@Component({
  selector: 'taskbird-task-sidebar',
  templateUrl: './task-sidebar.component.html',
  styleUrls: ['./task-sidebar.component.scss']
})
export class TaskSidebarComponent implements OnInit {

  @Input()
  task: Task;

  constructor() {
  }

  ngOnInit() {
  }

}
