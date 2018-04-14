import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { uniqueId } from 'lodash';

declare var $: any;

@Component({
  selector: 'taskbird-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  id: string;

  @Output()
  closed: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.id = uniqueId('taskbird-sidebar-');
  }

  ngOnDestroy() {
    this.closeSidebar();
  }

  openSidebar() {
    this.getSidebar()
      .sidebar({
        scrollLock: true,
        exclusive: true,
        onHidden: () => {
          this.closed.emit();
        }
      })
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
