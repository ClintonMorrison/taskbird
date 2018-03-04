import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'taskbird-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./projects-filter.component.scss']
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
