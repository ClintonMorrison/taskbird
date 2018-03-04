import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../../services/filter.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'taskbird-search-bar',
  template: `
    <form class="ui icon task-search input">
      <input
        (input)="handleChange($event)"
        [(ngModel)]="query"
        name="search" 
        placeholder="Search">
      <i class="search icon"></i>
    </form>
  `,
  styles: [`
    .task-search {
      width: 100%;
    }
  `]
})
export class SearchBarComponent implements OnInit {

  query: string;

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit() {
  }

  handleChange() {
    this.filterService.setSearchQuery(this.query);
  }

  getSearchQuery(): Observable<String> {
    return this.filterService.getSearchQuery();
  }
}
