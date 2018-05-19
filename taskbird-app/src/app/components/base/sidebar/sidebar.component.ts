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
    this.getSidebar().remove();
  }

  openSidebar() {
    this.getSidebar().sidebar('destroy');
    this.getSidebar()
      .sidebar({
        scrollLock: true,
        exclusive: true,
        onVisible: () => {
          $('body').css({ overflow: 'hidden' });
        },
        onHidden: () => {
          this.closed.emit();
        }
      })
      .sidebar('show');
  }

  closeSidebar() {
    $('body').css({ overflow: 'visible' });
    this.getSidebar()
      .sidebar('hide');
  }

  private getSidebar(): any {
    return $(`#${this.id}`);
  }

}
