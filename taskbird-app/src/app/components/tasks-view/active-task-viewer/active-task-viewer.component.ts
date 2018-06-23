import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FilterService } from '../../../services/filter.service';
import { Task } from '../../../models/item';
import { SidebarComponent } from '../../base/sidebar/sidebar.component';
import { BrowserService } from '../../../browser.service';

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
  private desktopMode: boolean;

  constructor(
    private filterService: FilterService,
    private browserService: BrowserService
  ) { }

  ngOnInit() {
    this.desktopMode = this.browserService.getWindowWidth() >= 1100;

    this.sub = this.filterService.getActiveTask()
      .subscribe(task => {
        this.activeTask = task;

        if (this.activeTask && !this.desktopMode) {
          setTimeout(() => this.sidebar.openSidebar(), 0);
        } else {
          $('.ui.sticky').sticky();
        }
      });
  }

  closed() {
    this.filterService.setActiveTask(null);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
