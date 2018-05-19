import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiResponse } from './models/api-response';

@Injectable()
export class ApiService {

  base = '/api/v1';

  constructor(
    private http: HttpClient,
  ) {}

  get(resource): Observable<any> {
    return this.http.get(
      `${this.base}/${resource}/?format=json`
    );
  }

  put(resource, id, data): Observable<any> {
    return this.http.put(
      `${this.base}/${resource}/${id}?format=json`,
      data
    );
  }

  post(resource, data): Observable<any> {
    return this.http.post(
      `${this.base}/${resource}/?format=json`,
      data
    );
  }

  delete(resource, id): Observable<any> {
    return this.http.delete(
      `${this.base}/${resource}/${id}?format=json`
    );
  }

  path(resource) {
    return `/api/v1/${resource}/?format=json`;
  }

}
