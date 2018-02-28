import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { TaskService } from '../../../services/item.service';

@Component({
  selector: 'taskbird-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {

  projects: Project[];
  taskCountsByProject: object;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(
      (projects) => this.projects = projects
    );

    this.taskService.getTaskCountsByProject().subscribe(
      (taskCounts) => this.taskCountsByProject = taskCounts
    );
  }

}
