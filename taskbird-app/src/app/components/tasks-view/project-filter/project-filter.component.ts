import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'taskbird-project-filter',
  template: `
    <div class="ui secondary menu filter-links">
      <a
        [ngClass]="{'active': projectActive(undefined) | async}"
        class="item"
        [routerLink]="['/tasks']">
        <i class="icon certificate"></i>
        All
      </a>
      <a 
        *ngFor="let project of projects"
        [ngClass]="{'active': projectActive(project) | async}"
        [routerLink]="['/tasks', project.id]"
        class="item">
      <i *ngIf="project" class="icon {{ project.icon }} {{ project.color }}"></i>
      {{ project.title }}
      </a>

      <a
        [ngClass]="{'active': projectActive(null) | async}"
        class="item"
        [routerLink]="['/tasks', 'uncategorized']">
        <i class="icon thin circle"></i>
        Uncategorized
      </a>
    </div>
  `,
  styles: [`
    .ui.secondary.menu.filter-links {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: -1em;
    }

    .ui.secondary.menu.filter-links .item {
        margin-bottom: 1em;
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

  projectActive(project: Project) {
    return this.filterService.getActiveProjet().map((activeProject) => {
      return activeProject === project;
    });
  }

}
