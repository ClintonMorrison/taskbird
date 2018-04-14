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

  private nextNewTaskId: number = -1;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.tasksByIdSubject = new BehaviorSubject({});
    this.taskSubjectById = {}; 
  }

  getTasksById(): Observable<TaskMap> {
    if (!this.tasksById) {
      this.tasksById = TaskService.mapResponse(MockTaskResponse);
      this.tasksByIdSubject.next(this.tasksById);
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
    this.tasksByIdSubject.next(this.tasksById);
  }

  createTask(taskFields: object): Task {
    const task: any = {
      id: 0,
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

    if (task.id === 0) {
      task.id = this.nextNewTaskId;
      this.nextNewTaskId -= 1;
    }

    this.tasksById[task.id] = task;
    this.tasksByIdSubject.next(this.tasksById);

    return task;
  }

  deleteTask(taskId: number) {
    delete this.tasksById[taskId];
    this.tasksByIdSubject.next(this.tasksById);
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
