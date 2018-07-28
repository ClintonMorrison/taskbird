import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FilterService } from '../../../services/filter.service';
import { Task } from '../../../models/item';
import { SidebarComponent } from '../../base/sidebar/sidebar.component';
import { BrowserService } from '../../../browser.service';
import * as _ from 'lodash';

declare var $: any;

@Component({
  selector: 'taskbird-active-task-viewer',
  templateUrl: './active-task-viewer.component.html',
  styleUrls: ['./active-task-viewer.component.scss']
})
export class ActiveTaskViewerComponent implements OnInit {

  activeTask: Task;
  private sub: Subscription;

  @ViewChild(SidebarComponent)
  private sidebar: SidebarComponent;

  // display details inline instead of in sidebar on large screens
  desktopMode: boolean;

  refresh: Function;

  constructor(
    private filterService: FilterService,
    private browserService: BrowserService
  ) { }

  ngOnInit() {
    this.desktopMode = this.isDesktopMode();
    this.sub = this.filterService.getActiveTask()
      .subscribe(task => {
        this.activeTask = task;
        this.showActiveTask();
      });
    
    const refresh = () => {
      console.log('refresh()');
      this.desktopMode = this.isDesktopMode();
      this.showActiveTask();
      setTimeout(() => $('.ui.sticky').sticky('refresh'), 500);
    }

    this.refresh = _.throttle(refresh, 500);
  }

  closed() {
    this.filterService.setActiveTask(null);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  isDesktopMode() {
    return this.browserService.getWindowWidth() > 991;
  }

  showActiveTask() {
    if (this.activeTask && !this.desktopMode) {
      setTimeout(() => this.sidebar.openSidebar(), 0);
    } else {
      setTimeout(() => $('.ui.sticky').sticky(), 0);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.refresh();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.refresh();
  }

}
