import { Injectable } from '@angular/core';
import { Task, TaskMap } from '../classes/item';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import MockTaskResponse from '../mocks/mock-task-api-response';

// TODO: remove
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ItemService {

  private baseUrl = 'http://localhost/api/v1/task/?format=json';
  private tasks : Task[] = null;
  private tasksById : TaskMap = null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getTask(id): Observable<Task> {
    return this.getTaskMap().map(itemsById => {
      return itemsById[id];
    });
  }

  getTasks(): Observable<Task[]> {
    if (this.tasks) {
      return of(this.tasks);
    }

    return of(MockTaskResponse)
      .map(response => {
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
      for (let task of tasks) {
        map[task.id] = task;
      }

      this.tasksById = map;
      return this.tasksById;
    });
  }
}
