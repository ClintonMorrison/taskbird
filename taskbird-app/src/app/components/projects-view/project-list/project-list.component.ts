import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../models/project';

@Component({
  selector: 'taskbird-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  @Input()
  projects: Project[];

  @Input()
  taskCountsByProject: object;

  getTaskCountsForProject(project: Project) {
    return this.taskCountsByProject[project.id] || {
      totalTaskCount: 0,
      completedTaskCount: 0
    };
  } 

  constructor() { }

  ngOnInit() {
  }

}
