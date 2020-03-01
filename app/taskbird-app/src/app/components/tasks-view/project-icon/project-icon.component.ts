import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/item';
import { ProjectService } from '../../../services/project.service';
import { Subscription } from 'rxjs/Subscription';
import { Project, ProjectMap } from '../../../models/project';

@Component({
  selector: 'taskbird-project-icon',
  template: `
    <i *ngIf="task.project && projectsById[task.project.id]" class="icon {{ projectsById[task.project.id].icon }} {{ projectsById[task.project.id].color }}"></i>
    <i *ngIf="!task.project || !projectsById[task.project.id]" class="circle outline icon"></i>
  `,
  styles: []
})
export class ProjectIconComponent implements OnInit {

  @Input()
  task: Task;

  sub: Subscription;

  projectsById: ProjectMap;

  constructor(
    private projectService: ProjectService) { }

  ngOnInit() {
    this.sub = this.projectService.getProjectsById().subscribe(
      (projectsById) => this.projectsById = projectsById
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
