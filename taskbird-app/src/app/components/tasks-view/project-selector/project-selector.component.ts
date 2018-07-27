import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { Subscription } from 'rxjs/Subscription';
import { chain } from 'lodash';
import { TaskService } from '../../../services/task.service';
import { DropdownOption } from '../../base/dropdown/dropdown.component';

@Component({
  selector: 'taskbird-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.scss']
})
export class ProjectSelectorComponent implements OnInit {

  @Output()
  projectChange = new EventEmitter<Project>();

  projects: Project[];

  projectOptions: DropdownOption[];

  @Input()
  projectId: string;

  @Input()
  showSelectAll: boolean;

  private sub: Subscription;

  constructor(
    private projectSerivce: ProjectService,
  ) {
  }

  ngOnInit() {
    this.sub = this.projectSerivce.getProjects().subscribe((projects) => {
      this.projects = projects;
      const options = this.projects.map(project => ({
        name: project.title,
        value: String(project.id),
        icon: `${project.icon} ${project.color}`
      }));

      this.projectOptions = [
        ...(this.showSelectAll ? [{ name: 'All', value: 'all', icon: 'certificate' }] : []),
        ...options,
        { name: 'Uncategorized', value: '', icon: 'circle outline' }
      ];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  handleChange(selectedId) {
    const id = parseInt(selectedId, 10);
    let project = chain(this.projects).filter({ id }).first().value();

    if (!project) {
      project = null;
    }

    this.projectChange.emit(project);  
  }
}
