import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { TaskService } from '../../../services/task.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'taskbird-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {

  projects: Project[];
  taskCountsByProject: object;
  private taskSub: Subscription;
  private projectSub: Subscription;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.projectSub = this.projectService.getProjects().subscribe(
      (projects) => this.projects = projects
    );

    this.taskSub = this.taskService.getTaskCountsByProject().subscribe(
      (taskCounts) => this.taskCountsByProject = taskCounts
    );
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
    this.taskSub.unsubscribe();
  }
}
