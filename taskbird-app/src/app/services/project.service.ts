import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import MockProjectResponse from '../mocks/mock-project-api-response';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { Project, ProjectMap } from '../models/project';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import { utc } from 'moment';
import { ApiService } from '../api.service';
import { ApiResponse } from '../models/api-response';

@Injectable()
export class ProjectService {

  private projectsById: ProjectMap;
  private projects: Project[];
  private projectsSubject: BehaviorSubject<Project[]>;
  private projectsByIdSubject: BehaviorSubject<ProjectMap>;
  private saveProject: Function;

  private fetched: boolean;
  private loadingSubject: BehaviorSubject<boolean>;


  constructor(
    private apiService: ApiService
  ) {
    this.projectsSubject = new BehaviorSubject([]);
    this.projectsByIdSubject = new BehaviorSubject({});

    this.saveProject = _.throttle(
      (project: Project) => this.apiService.put('project', project.id, project).first().subscribe(),
      1000
    );

    this.loadingSubject = new BehaviorSubject(true);
  }

  updateProject(project: Project): void {
    this.projectsById[project.id] = project;
    this.saveProject(project);
    this.projectsByIdSubject.next(this.projectsById);
  }

  loadProjects(): void {
    if (this.fetched) {
      return;
    }

    this.fetched = true;
    this.loadingSubject.next(false);

    this.apiService.get('project').first().subscribe((response: ApiResponse) => {
      this.projectsById = _.keyBy(response.objects, 'id');
      this.projectsByIdSubject.next(this.projectsById);
    });
  }

  getProjectsById(): Observable<ProjectMap> {
    if (!this.projectsById) {
      this.loadProjects();
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

  createProject(): Observable<Project> {
    const project = {
      title: 'New Project',
      description: '',
      icon: 'circle',
      color: 'black',
      date_created: utc().format()
    };

    return this.apiService.post('project', project).map((newProject: Project) => {
      this.projectsById[newProject.id] = newProject;
      this.projectsByIdSubject.next(this.projectsById);
      return newProject;
    });
  }

  deleteProject(projectId: number) {
    this.apiService.delete('project', projectId).first().subscribe(() => {
      delete this.projectsById[projectId];
      this.projectsByIdSubject.next(this.projectsById);
    });
  }

  isLoading() {
    return this.loadingSubject.asObservable();
  }

  private findById(projects, id) {
    return _(projects).chain().filter({ id }).first().value();
  }

}
