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
@Injectable()
export class ProjectService {

  private projects: Project[];

  constructor() { }

  getProjects(): Observable<Project[]> {
    if (this.projects) {
      return of(this.projects);
    }

    return of(MockProjectResponse).map(response => {
      this.projects = response.objects;
      return this.projects;
    });
  }

}
