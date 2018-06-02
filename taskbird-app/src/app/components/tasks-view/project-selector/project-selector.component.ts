import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '../../../models/item';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { Subscription } from 'rxjs/Subscription';
import { chain } from 'lodash';
import { TaskService } from '../../../services/item.service';
import { DropdownOption } from '../../base/dropdown/dropdown.component';

@Component({
  selector: 'taskbird-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.scss']
})
export class ProjectSelectorComponent implements OnInit {

  @Input()
  task: Task;

  @Output()
  projectChange = new EventEmitter<Project>();

  projects: Project[];

  projectOptions: DropdownOption[];

  selectedProjectId: string;

  private sub: Subscription;

  constructor(
    private projectSerivce: ProjectService,
    private taskService: TaskService
  ) {
  }

  ngOnInit() {
    this.selectedProjectId = this.task.project ? String(this.task.project.id) : '';

    this.sub = this.projectSerivce.getProjects().subscribe((projects) => {
      this.projects = projects;
      this.projectOptions = this.projects.map(project => ({
        name: project.title,
        value: String(project.id),
        icon: project.icon
      }));
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnChanges(changes) {
    if (changes.task) {
      this.selectedProjectId = this.task.project ? String(this.task.project.id) : '';
    }
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
