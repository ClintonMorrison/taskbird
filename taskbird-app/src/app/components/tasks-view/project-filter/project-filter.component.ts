import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'taskbird-project-filter',
  template: `
    <div class="ui secondary menu">
      <a
        [ngClass]="{'active': projectActive(undefined) | async}"
        class="item"
        (click)="handleProjectSelected(undefined)">
        <i class="icon certificate"></i>
        All
      </a>
      <a 
        *ngFor="let project of projects"
        [ngClass]="{'active': projectActive(project) | async}"

        (click)="handleProjectSelected(project)"
        class="item">
      <i *ngIf="project" class="icon {{ project.icon }} {{ project.color }}"></i>
      {{ project.title }}
      </a>

      <a
        [ngClass]="{'active': projectActive(null) | async}"
        class="item"
        (click)="handleProjectSelected(null)">
        <i class="icon thin circle"></i>
        Uncategorized
      </a>
    </div>
  `,
  styles: [`
    .ui.secondary.menu {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 2em;
    }
  `]
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
    return this.filterService.getActiveProjet().map((activeProject) => {
      return activeProject === project;
    });
  }

}
