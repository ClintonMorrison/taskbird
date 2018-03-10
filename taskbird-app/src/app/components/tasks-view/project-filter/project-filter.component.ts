import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { FilterService } from '../../../services/filter.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'taskbird-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./projects-filter.component.scss']
})
export class ProjectFilterComponent implements OnInit {

  @Input()
  projects: Project[];

  private sub: Subscription;

  constructor(
    private projectService: ProjectService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.sub = this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  projectActive(project: Project) {
    return this.filterService.getFilterProject().map((activeProject) => {
      return activeProject === project;
    });
  }

}
