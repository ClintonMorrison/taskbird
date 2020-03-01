import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/item';
import { FilterService } from '../../../services/filter.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SidebarComponent } from '../../base/sidebar/sidebar.component';
import { BrowserService } from '../../../browser.service';
import { Project } from '../../../models/project';

@Component({
  selector: 'taskbird-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private filterService: FilterService,
    private route: ActivatedRoute,
    private browserService: BrowserService
  ) {}
  
  taskIds: number[] = [];
  unfilteredTasks: Task[] = [];
  activeTask: Task;
  filterProject: Project;

  private filterSub: Subscription;
  private taskSub: Subscription;
  private routeSub: Subscription;
  private projectSub: Subscription;

  subscribeToTasks(): void {
    this.filterSub = this.filterService.getFilteredTaskIds()
      .subscribe(taskIds => this.taskIds = taskIds);
  }

  subscribeToUnfilteredTasks(): void {
    this.taskSub = this.taskService.getTasks()
      .subscribe(tasks => this.unfilteredTasks = tasks);
  }

  subscribeToRouteChanges(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      const id = params.projectId;
      const parsedId = parseInt(id, 10);

      if (parsedId) {
        this.filterService.setProjectById(parsedId);
      } else if (id === 'uncategorized'){
        this.filterService.setProject(null);
      } else {
        this.filterService.setProject(undefined);
      }
    });
  }

  subscribeToFilterProject(): void {
    this.projectSub = this.filterService.getFilterProject().subscribe(
      (project: Project) => this.filterProject = project
    );
  }

  ngOnInit() {
    this.filterService.setActiveTask(undefined);

    this.subscribeToTasks();
    this.subscribeToUnfilteredTasks();
    this.subscribeToRouteChanges();
    this.subscribeToFilterProject();

    this.browserService.scrollToTop();
    this.filterService.setSearchQuery('');
  }

  ngOnDestroy() {
    this.filterSub.unsubscribe();
    this.taskSub.unsubscribe();
    this.routeSub.unsubscribe();
    this.projectSub.unsubscribe();
  }

}
