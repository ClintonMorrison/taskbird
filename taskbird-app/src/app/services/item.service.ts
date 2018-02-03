import { Injectable } from '@angular/core';
import { Task, TaskMap, StringTaskMap } from '../models/item';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import MockTaskResponse from '../mocks/mock-task-api-response';
import * as _ from 'lodash';
import { Date, momentToDate } from '../models/dates';
import { utc } from 'moment';

// TODO: remove
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TaskService {
  private baseUrl = "http://localhost/api/v1/task/?format=json";
  private tasks: Task[] = null;
  private tasksById: TaskMap = null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

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

  /*
  groupTasksByDay(): Observable<StringTaskMap> {
    return this.getTasks().filter((tasks) => {
      const tasksByDay = {};

      for (const task of tasks) {
        const dateDue = utc(task.date_due).format('YYYY-MM-DD');
        if (!tasksByDay[dateDue]) {
          tasksByDay[dateDue] = [];
        }
        tasksByDay[dateDue].push(task);
      }

      return tasksByDay;
    });
  }*/

  /*
  getTasksByDate(date: Date): Observable<Task[]> {
    return this.groupTasksByDay().filter((taskMap: StringTaskMap) => {
      return null;
    });
  }*/
}
