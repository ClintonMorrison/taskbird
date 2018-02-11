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
@Injectable()
export class ProjectService {

  private projects: Project[];
  private projectsSubject: BehaviorSubject<Project[]>;

  constructor() {
    this.projectsSubject = new BehaviorSubject([]);
  }

  getProjects(): Observable<Project[]> {
    if (this.projects) {
      return this.projectsSubject.asObservable();
    }

    this.projects = MockProjectResponse.objects;
    this.projectsSubject.next(this.projects);
    return this.projectsSubject.asObservable();
  }

}
