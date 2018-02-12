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
  private activeProjectSubject: BehaviorSubject<Project>;

  private tasks: Task[];
  private filteredTasksSubject: BehaviorSubject<Task[]>;

  private showCompletedTasks: boolean; 
  private showCompletedTasksSubject: BehaviorSubject<Boolean>;

  private searchQuery: string;
  private searchQuerySubject: BehaviorSubject<String>;


  constructor(
    private taskService: TaskService
  ) {
    this.filteredTasksSubject = new BehaviorSubject([]);
    this.activeProjectSubject = <BehaviorSubject<Project>>new BehaviorSubject(undefined);
    this.showCompletedTasksSubject = new BehaviorSubject(false);
    this.searchQuerySubject = new BehaviorSubject('');

    this.getActiveProjet().subscribe(() => this.updateFilteredTasks());
    this.getShowCompletedTasks().subscribe(() => this.updateFilteredTasks());
    this.getSearchQuery().subscribe(() => this.updateFilteredTasks());

    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.updateFilteredTasks();
    });
  }

  getSearchQuery(): Observable<String> {
    return this.searchQuerySubject.asObservable();
  }

  setSearchQuery(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.searchQuerySubject.next(searchQuery);
  }

  setProject(project: Project) {
    this.activeProject = project;
    this.activeProjectSubject.next(project);
  }

  setShowCompletedTasks(showCompletedTasks: boolean) {
    this.showCompletedTasks = showCompletedTasks;
    this.showCompletedTasksSubject.next(showCompletedTasks);
  }
  
  getShowCompletedTasks(): Observable<Boolean> {
    return this.showCompletedTasksSubject.asObservable();
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
    console.log('updating...');
    const filteredTasks = _(this.tasks).filter((task) => {
      return this.projectMatchesActive(task.project) &&
        this.taskMatchesCompletedFilter(task) &&
        this.taskMatchesSearchFilter(task);
    }).value();

    this.filteredTasksSubject.next(filteredTasks);
  }

  private projectMatchesActive(project: Project) {
    if (this.activeProject === undefined || this.activeProject === project) {
      return true;
    } else if (this.activeProject && project && this.activeProject.id === project.id) {
      return true;
    }

    return false;
  }

  private taskMatchesCompletedFilter(task: Task) {
    if (this.showCompletedTasks) {
      return true;
    }

    return task.done === false;
  }

  private taskMatchesSearchFilter(task: Task) {
    if (!this.searchQuery) {
      return true;
    }

    const q = this.searchQuery.toLowerCase();
    
    const fields = [
      task.title || '',
      task.description || '',
    ];

    if (task.project) {
      fields.push(task.project.title);
    }

    return _(fields).filter((field) => (
      field.toLowerCase().includes(q)
    )).value().length > 0;
  }
}
