import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FilterService } from '../../../services/filter.service';
import { Task } from '../../../models/item';
import { SidebarComponent } from '../../base/sidebar/sidebar.component';

@Component({
  selector: 'taskbird-active-task-viewer',
  templateUrl: './active-task-viewer.component.html',
  styleUrls: ['./active-task-viewer.component.scss']
})
export class ActiveTaskViewerComponent implements OnInit {

  private activeTask: Task;
  private sub: Subscription;

  @ViewChild(SidebarComponent)
  private sidebar: SidebarComponent;

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.sub = this.filterService.getActiveTask()
      .subscribe(task => {
        this.activeTask = task;

        if (this.activeTask) {
          setTimeout(() => this.sidebar.openSidebar(), 0);
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
