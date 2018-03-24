import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Task } from '../models/item';
import { TaskService } from './item.service';
import * as _ from 'lodash';
import { utc } from 'moment';
import { ProjectService } from './project.service';

// https://coryrylan.com/blog/angular-observable-data-services

@Injectable()
export class FilterService {

  private activeProject: Project;
  private activeProjectSubject: BehaviorSubject<Project>;

  private activeTask: Task;
  private activeTaskSubject: BehaviorSubject<Task>;
  
  private filterProject: Project;
  private filterProjectSubject: BehaviorSubject<Project>;

  private tasks: Task[];
  private projects: Project[];
  private filteredTasksSubject: BehaviorSubject<Task[]>;
  private filteredTaskIdsSubject: BehaviorSubject<string[]>;

  private showCompletedTasks: boolean; 
  private showCompletedTasksSubject: BehaviorSubject<Boolean>;

  private searchQuery: string;
  private searchQuerySubject: BehaviorSubject<String>;

  private sort: string;
  private sortSubject: BehaviorSubject<String>;


  constructor(
    private taskService: TaskService,
    private projectService: ProjectService
  ) {
    this.filteredTasksSubject = new BehaviorSubject([]);
    this.filteredTaskIdsSubject = new BehaviorSubject([]);

    this.filterProjectSubject = <BehaviorSubject<Project>>new BehaviorSubject(undefined);
    this.activeProjectSubject = <BehaviorSubject<Project>>new BehaviorSubject(undefined);

    this.showCompletedTasksSubject = new BehaviorSubject(false);
    this.searchQuerySubject = new BehaviorSubject('');
    this.sortSubject = new BehaviorSubject('date_due_asc');
    this.activeTaskSubject = new BehaviorSubject(null);

    this.getFilterProject().subscribe(() => this.updateFilteredTasks());
    this.getShowCompletedTasks().subscribe(() => this.updateFilteredTasks());
    this.getSearchQuery().subscribe(() => this.updateFilteredTasks());
    this.getSort().subscribe(() => this.updateFilteredTasks());
    this.projectService.getProjects().subscribe((projects: Project[]) => this.projects = projects)
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.updateFilteredTasks();
    });
  }

  getSort(): Observable<String> {
    return this.sortSubject.asObservable();
  }

  getActiveTask(): Observable<Task> {
    return this.activeTaskSubject.asObservable();
  }

  setSort(sort: string) {
    this.sort = sort;
    this.sortSubject.next(sort);
  }

  getSearchQuery(): Observable<String> {
    return this.searchQuerySubject.asObservable();
  }

  setSearchQuery(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.searchQuerySubject.next(searchQuery);
  }

  setProject(project: Project) {
    this.filterProject = project;
    this.filterProjectSubject.next(project);
  }

  setProjectById(id: number): void {
    const project = _(this.projects).filter({ id }).first();
    if (project) {
      this.setProject(project);
    }
  }

  setShowCompletedTasks(showCompletedTasks: boolean) {
    this.showCompletedTasks = showCompletedTasks;
    this.showCompletedTasksSubject.next(showCompletedTasks);
  }

  setActiveTask(task: Task) {
    this.activeTask = task;
    this.activeTaskSubject.next(task);
  }
  
  getShowCompletedTasks(): Observable<Boolean> {
    return this.showCompletedTasksSubject.asObservable();
  }

  getActiveProject(): Observable<Project> {
    return this.activeProjectSubject.asObservable();
  }

  setActiveProject(project: Project) {
    this.activeProject = project;
    this.activeProjectSubject.next(project);
  }

  getFilterProject(): Observable<Project> {
    return this.filterProjectSubject.asObservable();
  }

  getFilteredTasks(): Observable<Task[]> {
    return this.filteredTasksSubject.asObservable();
  }

  getFilteredTaskIds(): Observable<number[]> {
    return this.getFilteredTasks().map((filteredTasks: Task[]) => {
      return _.map(filteredTasks, task => task.id);
    });
  }

  createTaskMatchingFilters(taskFields: object): void {
    const task = this.taskService.createTask({
      title: this.searchQuery || 'New Task',
      project: this.filterProject,
      ...taskFields
    });

    this.setActiveTask(task);
  }

  private updateFilteredTasks() {
    const filteredTasks = _(this.tasks).filter((task) => {
      return this.projectMatchesFilter(task.project) &&
        this.taskMatchesCompletedFilter(task) &&
        this.taskMatchesSearchFilter(task);
    }).value();

    const sortedTasks = this.sortTasks(filteredTasks);

    this.filteredTasksSubject.next(sortedTasks);
  }

  private projectMatchesFilter(project: Project) {
    if (this.filterProject === undefined || this.filterProject === project) {
      return true;
    } else if (this.filterProject && project && this.filterProject.id === project.id) {
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

  private getSortFieldForTask(task: Task) {
    if (!this.sort) {
      return true;
    }

    if (this.sort.includes('date_due')) {
      return utc(task.date_due).unix();
    } else if (this.sort.includes('date_created')) {
      return utc(task.date_created).unix();
    } else if (this.sort === 'project') {
      return task.project ? task.project.id : null;
    }
  }

  private sortTasks(tasks: Task[]) {
    let sortedTasks = _.sortBy(tasks, (task: Task) => {
      return this.getSortFieldForTask(task);
    });

    if (this.sort && !this.sort.includes('_asc')) {
       _.reverse(sortedTasks);
    }

    return sortedTasks;
  }
}
