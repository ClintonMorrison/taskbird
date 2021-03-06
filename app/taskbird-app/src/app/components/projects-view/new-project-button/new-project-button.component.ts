import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { FilterService } from '../../../services/filter.service';
import { Project } from '../../../models/project';

@Component({
  selector: 'taskbird-new-project-button',
  template: `
    <button class="ui segment" (click)="click()">
      <h2 class="heading">New Project</h2>
    </button>
  `,
  styles: [`
    button {
      width: 100%;
      min-height: 10em;
    }
  `]
})
export class NewProjectButtonComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
  }

  click() {
    this.projectService.createProject().first().subscribe((project: Project) => {
      this.filterService.setActiveProject(project);
    });
  }

}
