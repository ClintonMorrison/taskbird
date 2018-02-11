import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';

@Component({
  selector: 'taskbird-project-filter',
  template: `
    <div class="ui secondary pointing menu">
      <a *ngFor="let project of projects" class="item">
      <i *ngIf="project" class="icon {{ project.icon }} {{ project.color }}"></i>
      {{ project.title }}
      </a>
    </div>

  `,
  styles: []
})
export class ProjectFilterComponent implements OnInit {

  @Input()
  projects: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

}
