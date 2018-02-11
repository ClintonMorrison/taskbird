import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Task } from '../models/item';
import { TaskService } from './item.service';
import * as _ from 'lodash';
// https://coryrylan.com/blog/angular-observable-data-services

@Injectable()
export class FilterService {

  private activeProject: Project;
  private tasks: Task[];

  private activeProjectSubject: BehaviorSubject<Project>;
  private filteredTasksSubject: BehaviorSubject<Task[]>;

  constructor(
    private taskService: TaskService
  ) {
    this.filteredTasksSubject = new BehaviorSubject([]);
    this.activeProjectSubject = <BehaviorSubject<Project>>new BehaviorSubject(null);
  
    this.getActiveProjet().subscribe(() => {
      this.updateFilteredTasks();
    });

    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.updateFilteredTasks();
    });

  }

  setProject(project: Project) {
    this.activeProject = project;
    this.activeProjectSubject.next(project);
  }

  getActiveProjet(): Observable<Project> {
    return this.activeProjectSubject.asObservable();
  }

  projectIsActive(project: Project): Observable<Boolean> {
    return this.activeProjectSubject.asObservable().map((activeProject: Project) => {
      return this.projectMatchesActive(project);
    });
  }

  getFilteredTasks(): Observable<Task[]> {
    return this.filteredTasksSubject.asObservable();
  }

  private updateFilteredTasks() {
    const filteredTasks = _(this.tasks).filter((task) => {
      return this.projectMatchesActive(task.project);
    }).value();

    this.filteredTasksSubject.next(filteredTasks);
  }

  private projectMatchesActive(project: Project) {
    if (this.activeProject === project) {
      return true;
    } else if (this.activeProject && project && this.activeProject.id === project.id) {
      return true;
    }

    return false;
  }
}
