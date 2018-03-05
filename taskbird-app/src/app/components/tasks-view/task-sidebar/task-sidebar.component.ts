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

  id: string;

  @Input()
  task: Task;

  constructor() {
  }

  ngOnInit() {
    this.id = uniqueId('task-sidebar-');
  }

  ngOnDestroy() {
    this.closeSidebar();
  }

  openSidebar() {
    this.getSidebar()
      .sidebar('setting', 'exclusive', true)
      .sidebar('show');
  }

  closeSidebar() {
    this.getSidebar()
      .sidebar('hide');
  }

  private getSidebar(): any {
    return $(`#${this.id}`);
  }

}
