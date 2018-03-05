import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/item';
import { uniqueId } from 'lodash';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { Subscription } from 'rxjs/Subscription';

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

  private sub: Subscription;

  constructor(
    private projectSerivce: ProjectService
  ) {
    this.id = uniqueId('project-selector-');
  }

  ngOnInit() {
    setTimeout(() => {
      this.getDropdown().dropdown();
    }, 0);

    this.sub = this.projectSerivce.getProjects()
      .subscribe((projects) => this.projects = projects);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private getDropdown(): any {
    return $(`#${this.id}`);
  }
}
