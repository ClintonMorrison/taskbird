import { Injectable } from '@angular/core';
import { Project } from '../models/project';

// https://coryrylan.com/blog/angular-observable-data-services

@Injectable()
export class FilterService {

  private project: Project;

  constructor() { }

  setProject(project: Project) {
    this.project = project;
  }

  projectIsActive(project: Project) {
    return (this.project && project && this.project.id === project.id);
  }

}
