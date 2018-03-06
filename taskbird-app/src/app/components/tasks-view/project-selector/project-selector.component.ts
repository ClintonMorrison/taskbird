import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/item';
import { uniqueId } from 'lodash';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { Subscription } from 'rxjs/Subscription';
import { chain } from 'lodash';
import { TaskService } from '../../../services/item.service';

declare var $: any;

@Component({
  selector: 'taskbird-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.scss']
})
export class ProjectSelectorComponent implements OnInit {

  @Input()
  task: Task;

  id: string;

  projects: Project[];

  selectedProjectId: string;

  private sub: Subscription;

  constructor(
    private projectSerivce: ProjectService,
    private taskService: TaskService
  ) {
    this.id = uniqueId('project-selector-');
  }

  ngOnInit() {
    this.selectedProjectId = this.task.project ? String(this.task.project.id) : '';

    setTimeout(() => {
      // this.getDropdown().dropdown();
    }, 0);

    this.sub = this.projectSerivce.getProjects()
      .subscribe((projects) => this.projects = projects);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnChanges(changes) {
    if (changes.task) {
      this.selectedProjectId = this.task.project ? String(this.task.project.id) : '';
    }
  }

  handleChange() {
    const id = parseInt(this.selectedProjectId, 10);
    let project = chain(this.projects).filter({ id }).first().value();

    if (!project) {
      project = null;
    }

    const updatedTask = { ...this.task, project };
    this.taskService.updateTask(updatedTask);
  }

  private getDropdown(): any {
    return $(`#${this.id}`);
  }
}
