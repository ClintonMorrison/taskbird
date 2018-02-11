import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'taskbird-project-filter',
  template: `
    <div class="ui secondary pointing menu">
      <a 
        *ngFor="let project of projects"
        [ngClass]="{'active': projectActive(project) | async}"

        (click)="handleProjectSelected(project)"
        class="active item">
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

  constructor(
    private projectService: ProjectService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  handleProjectSelected(project: Project) {
    this.filterService.setProject(project);
  }

  projectActive(project: Project) {
    return this.filterService.projectIsActive(project);
  }

}
