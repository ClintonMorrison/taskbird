import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
// https://coryrylan.com/blog/angular-observable-data-services

@Injectable()
export class FilterService {

  private project: Project;
  private activeProject: BehaviorSubject<Project>;

  constructor() {
    this.activeProject = <BehaviorSubject<Project>>new BehaviorSubject(null);
  }

  setProject(project: Project) {
    this.project = project;
    this.activeProject.next(project);
  }

  getActiveProjet(): Observable<Project> {
    return this.activeProject.asObservable();
  }

  projectIsActive(project: Project): Observable<Boolean> {
    return this.activeProject.asObservable().map((activeProject: Project) => {
      if(!activeProject && !project) {
        return true;
      } else if (activeProject && project && activeProject.id === project.id) {
        return true;
      }
      
      return false;
    })
  }

}
