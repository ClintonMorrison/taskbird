import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ProjectService } from '../../../services/project.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'taskbird-loading-dimmer',
  templateUrl: './loading-dimmer.component.html',
  styleUrls: ['./loading-dimmer.component.scss']
})
export class LoadingDimmerComponent implements OnInit {

  active: boolean;

  private tasksLoading: boolean;
  private projectsLoading: boolean;

  taskSub: Subscription;
  projectSub: Subscription;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.active = true;
    this.taskSub = this.taskService.isLoading().subscribe(
      (loading: boolean) => {
        this.tasksLoading = loading;
        this.updateActive();
      }
    );

    this.projectSub = this.projectService.isLoading().subscribe(
      (loading: boolean) => {
        this.projectsLoading = loading;
        this.updateActive();
      }
    );
  }

  ngOnDestroy() {
    this.taskSub.unsubscribe();
    this.projectSub.unsubscribe();
  }

  updateActive() {
    this.active = this.tasksLoading || this.projectsLoading;
  }

}
