import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { FilterService } from '../../../services/filter.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownOption } from '../../base/dropdown/dropdown.component';

@Component({
  selector: 'taskbird-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./projects-filter.component.scss']
})
export class ProjectFilterComponent implements OnInit {

  @Input()
  projects: Project[];
  activeProject: any;

  private filterSub: Subscription;
  private projectSub: Subscription;

  projectOptions: DropdownOption[];

  @Input()
  projectId: string;

  constructor(
    private projectService: ProjectService,
    private filterService: FilterService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.filterSub = this.filterService.getFilterProject().subscribe((activeProject) => {
      if (activeProject === undefined) {
        this.activeProject = { id: 'all' };
      } else if (activeProject === null) {
        this.activeProject = { id: 'uncategorized' };
      } else {
        this.activeProject = activeProject
      }
    });

    this.projectSub = this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
      const options = this.projects.map(project => ({
        name: project.title,
        value: String(project.id),
        icon: `${project.icon} ${project.color}`
      }));

      this.projectOptions = [
        { name: 'All', value: 'all', icon: 'certificate' },
        ...options,
        { name: 'Uncategorized', value: 'uncategorized', icon: 'circle outline' }
      ];
    });

  }

  ngOnDestroy() {
    this.filterSub.unsubscribe();
    this.projectSub.unsubscribe();
  }

  updateActiveProject(projectId) {
    this.router.navigateByUrl(`/tasks/${projectId}`)
  }
}
