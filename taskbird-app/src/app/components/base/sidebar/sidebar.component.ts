import { Component, OnInit } from '@angular/core';
import { uniqueId } from 'lodash';

declare var $: any;

@Component({
  selector: 'taskbird-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  id: string;

  constructor() { }

  ngOnInit() {
    this.id = uniqueId('taskbird-sidebar-');
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
