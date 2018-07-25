import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'

@Injectable()
export class ApiService {

  base = '/api/v1';

  constructor(
    private http: HttpClient,
  ) {}

  get(resource): Observable<any> {
    return this.request(
      'get',
      `${this.base}/${resource}/?format=json`
    );
  }

  put(resource, id, data): Observable<any> {    
    return this.request(
      'put',
      `${this.base}/${resource}/${id}/?format=json`,
      data
    );
  }

  post(resource, data): Observable<any> {
    return this.request(
      'post',
      `${this.base}/${resource}/?format=json`,
      data
    );
  }

  delete(resource, id): Observable<any> {
    return this.request(
      'delete',
      `${this.base}/${resource}/${id}/?format=json`
    );
  }

  request(method: string, url: string, data = {}): Observable<any> {
    return this.http[method](
      url,
      data,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ).catch(error => {
      if (error.status === 401) {
        window.location.pathname = '/login/';
      }
    });
  }
}
