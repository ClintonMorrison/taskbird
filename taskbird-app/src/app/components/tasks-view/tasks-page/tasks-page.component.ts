import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/item.service';
import { Task } from '../../../models/item';
import { FilterService } from '../../../services/filter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'taskbird-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private filterService: FilterService,
    private route: ActivatedRoute
  ) {}
  
  selectedProjectId: number;
  taskIds: number[] = [];
  unfilteredTasks: Task[] = [];

  subscribeToTasks(): void {
    this.filterService.getFilteredTaskIds()
      .subscribe(taskIds => this.taskIds = taskIds);
  }

  subscribeToUnfilteredTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.unfilteredTasks = tasks);
  }

  subscribeToRouteChanges(): void {
    this.route.params.subscribe((params) => {
      const id = params.projectId;
      const parsedId = parseInt(id, 10);
      if (parsedId) {
        this.filterService.setProjectById(parsedId);
      } else if (id === 'uncategorized'){
        this.filterService.setProject(null);
      } else {
        this.filterService.setProject(undefined);
      }
    })
  }

  ngOnInit() {
    this.subscribeToTasks();
    this.subscribeToUnfilteredTasks();
    this.subscribeToRouteChanges();
  }

  ngOnDestroy() {
  }

}
