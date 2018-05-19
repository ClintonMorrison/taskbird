import { Injectable } from '@angular/core';
import { Task, TaskMap, StringTaskMap } from '../models/item';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import MockTaskResponse from '../mocks/mock-task-api-response';
import * as _ from 'lodash';
import { Date } from '../models/dates';
import { utc } from 'moment';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { FilterService } from './filter.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Project } from '../models/project';
// import { ApiResponse } from '../models/api-response';
import { ApiService } from '../api.service';
import { ApiResponse } from '../models/api-response';

interface TaskSubjectMap {
  [key: number]: BehaviorSubject<Task>;
}

@Injectable()
export class TaskService {
  private baseUrl = 'http://localhost/api/v1/task/?format=json';
  private tasks: Task[] = null;

  private tasksByIdSubject: BehaviorSubject<TaskMap>;
  private taskSubjectById: TaskSubjectMap;

  private tasksById: TaskMap = null;

  private fetched: boolean;
  private loadingSubject: BehaviorSubject<boolean>;

  private saveTask: Function;

  constructor(
    private messageService: MessageService,
    private apiService: ApiService 
  ) {
    this.tasksByIdSubject = new BehaviorSubject({});
    this.taskSubjectById = {};
    this.saveTask = _.throttle(
      (task) => this.apiService.put('task', task.id, task).first().subscribe(),
      2000
    );

    this.loadingSubject = new BehaviorSubject(true);
  }

  loadTasks(): void {
    if (this.fetched) {
      return;
    }

    this.fetched = true;

    this.apiService.get('task').first().subscribe((response: ApiResponse) => {
      this.tasksById = TaskService.mapResponse(response);
      this.tasksByIdSubject.next(this.tasksById);
      this.loadingSubject.next(false);
    });
  }

  getTasksById(): Observable<TaskMap> {
    if (!this.tasksById) {
      this.loadTasks();
    }

    return this.tasksByIdSubject.asObservable();
  }

  getTaskById(id: string): Observable<Task> {
    if (!this.taskSubjectById[id]) {
      this.taskSubjectById[id] = new BehaviorSubject(null);

      this.getTasksById().subscribe((tasksById: TaskMap) => {
        this.taskSubjectById[id].next(tasksById[id]);
      });
    }

    return this.taskSubjectById[id].asObservable();
  }

  getTaskIds(): Observable<string[]> {
    return this.getTasksById().map((tasksById) => {
      return _.keys(tasksById);
    });
  }

  getTasks(): Observable<Task[]> {
    return this.getTasksById()
      .map(tasksById => _.values(tasksById));
  }

  groupTasksByDayDue(): Observable<StringTaskMap> {
    return this.groupTasksByCallback(
      (task: Task) => (task.date_due ? this.formatDate(task.date_due) : null)
    );
  }

  groupTasksByDayCreated(): Observable<StringTaskMap> {
    return this.groupTasksByCallback(
      (task: Task) => (this.formatDate(task.date_created))
    );
  }

  groupTasksByDayCompleted(): Observable<StringTaskMap> {
    return this.groupTasksByCallback(
      (task: Task) => (task.done && this.formatDate(task.date_modified))
    );
  }

  groupTasksByProjectTitle(): Observable<StringTaskMap> {
    return this.groupTasksByCallback(
      (task: Task) => (task.project && task.project.title)
    );
  }

  groupTasksByProject(): Observable<StringTaskMap> {
    return this.groupTasksByCallback(
      (task: Task) => (task.project && task.project.id)
    );
  }

  groupTasksByCallback(callback: Function): Observable<StringTaskMap> {
    return this.getTasks().map((tasks: Task[]) => {
      return this.groupByCallback(tasks, callback);
    });
  }

  getTaskCountsByProject(): Observable<any> {
    return this.groupTasksByProject().map((tasksByProject: any) => {
      const counts = {};

      for (const id in tasksByProject) {
        const tasks = tasksByProject[id];
        const totalTaskCount = tasks.length;
        const completedTaskCount = _.filter(tasks, (task: Task) => task.done).length;
        
        counts[id] = { totalTaskCount, completedTaskCount };
      }
      return counts;
    });
  }

  updateTask(task: Task) {
    this.tasksById[task.id] = task;
    this.saveTask(task);
    this.tasksByIdSubject.next(this.tasksById);
  }

  createTask(taskFields: object): Observable<Task> {
    const task: any = {
      title: "New Task",
      date_completed: null,
      date_created: null,
      date_due: null,
      date_modified: null,
      description: "",
      done: false,
      priority: "Normal",
      project: null,
      ...taskFields
    };

    return this.apiService.post('task', task).map((newTask: Task) => {
      console.log('post response', newTask);
      this.tasksById[newTask.id] = newTask;
      this.tasksByIdSubject.next(this.tasksById);
      return newTask;
    });

  }

  deleteTask(taskId: number) {
    this.apiService.delete('task', taskId).first().subscribe((response) => {
      delete this.tasksById[taskId];
      this.tasksByIdSubject.next(this.tasksById);
    });
  }

  isLoading() {
    return this.loadingSubject.asObservable();
  }

  private groupByCallback(tasks: Task[], callback: Function): StringTaskMap {
    const result = {};

    for (const task of tasks) {
      const key = callback(task);
      if (key) {
        if (!result[key]) {
          result[key] = [];
        }

        result[key].push(task);
      }
    }

    return result;
  }

  private formatDate(date: string): string {
    if (date) {
      return utc(date).format('YYYY-MM-DD');
    }

    return null;
  }

  static mapResponse(response: ApiResponse): TaskMap {
    const tasks = response.objects;
    return _.keyBy(tasks, 'id');
  }

}
