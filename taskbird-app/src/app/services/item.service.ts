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

@Injectable()
export class TaskService {
  private baseUrl = 'http://localhost/api/v1/task/?format=json';
  private tasks: Task[] = null;

  private tasksById: TaskMap = null;
  private tasksByDayDue: StringTaskMap = null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }

  getTask(id): Observable<Task> {
    return this.getTaskMap().map(itemsById => {
      return itemsById[id];
    });
  }

  getTasks(): Observable<Task[]> {
    if (this.tasks) {
      return of(this.tasks);
    }

    return of(MockTaskResponse).map(response => {
      this.tasks = response.objects;
      return this.tasks;
    });
  }

  getTaskMap(): Observable<TaskMap> {
    if (this.tasksById) {
      return of(this.tasksById);
    }

    return this.getTasks().map(tasks => {
      const map = {};
      for (const task of tasks) {
        map[task.id] = task;
      }

      this.tasksById = map;
      return this.tasksById;
    });
  }

  groupTasksByDayDue(): Observable<StringTaskMap> {
    if (this.tasksByDayDue) {
      return of(this.tasksByDayDue);
    }

    return this.getTasks().map((tasks: Task[]) => {
      return this.groupByCallback(tasks, (task) => (
        task.date_due ? utc(task.date_due).format('YYYY-MM-DD') : null
      ));
    });
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


}
