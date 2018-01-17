import { Injectable } from '@angular/core';
import { Item } from '../classes/item';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import MockTaskResponse from '../mocks/mock-task-api-response';

// TODO: remove
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ItemService {

  private baseUrl = 'http://localhost/api/v1/task/?format=json';
  private items : Item[] = null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getItems(): Observable<Item[]> {
    if (this.items) {
      return of(this.items);
    }

    return of(MockTaskResponse)
      .map(response => {
        return response.objects;
      });
  }
}
