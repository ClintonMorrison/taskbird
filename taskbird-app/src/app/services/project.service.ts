import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import MockProjectResponse from '../mocks/mock-project-api-response';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { Project } from '../models/project';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

interface ProjectMap {
  [key: number]: Project
}

@Injectable()
export class ProjectService {

  private projectsById: ProjectMap;
  private projects: Project[];
  private projectsSubject: BehaviorSubject<Project[]>;
  private projectsByIdSubject: BehaviorSubject<ProjectMap>;

  constructor() {
    this.projectsSubject = new BehaviorSubject([]);
    this.projectsByIdSubject = new BehaviorSubject({});
  }

  updateProject(project: Project): void {
    this.projectsById[project.id] = project;
    this.projectsByIdSubject.next(this.projectsById);
  }

  getProjectsById(): Observable<ProjectMap> {
    if (!this.projectsById) {
      this.projectsById = _.keyBy(MockProjectResponse.objects, 'id');
      this.projectsByIdSubject.next(this.projectsById);
    }

    return this.projectsByIdSubject.asObservable();
  }

  getProjects(): Observable<Project[]> {
    return this.getProjectsById().map(_.values);
  }

  // TODO: maintain subject for every project
  getProjectById(id: number): Observable<Project> {
    return this.getProjectsById().map((projectsById) => {
      return projectsById[id];
    });
  }

  private findById(projects, id) {
    return _(projects).chain().filter({ id }).first().value();
  }

}
