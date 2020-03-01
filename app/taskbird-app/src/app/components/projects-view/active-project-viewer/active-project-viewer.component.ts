import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FilterService } from '../../../services/filter.service';
import { SidebarComponent } from '../../base/sidebar/sidebar.component';
import { Project } from '../../../models/project';

@Component({
  selector: 'taskbird-active-project-viewer',
  templateUrl: './active-project-viewer.component.html',
  styleUrls: ['./active-project-viewer.component.scss']
})
export class ActiveProjectViewerComponent implements OnInit {

  activeProject: Project;
  private sub: Subscription;

  @ViewChild(SidebarComponent)
  private sidebar: SidebarComponent;

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.sub = this.filterService.getActiveProject()
      .subscribe(project => {
        this.activeProject = project;

        if (this.activeProject) {
          setTimeout(() => this.sidebar.openSidebar(), 0);
        }
      });
  }

  closed() {
    this.filterService.setActiveProject(null);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
