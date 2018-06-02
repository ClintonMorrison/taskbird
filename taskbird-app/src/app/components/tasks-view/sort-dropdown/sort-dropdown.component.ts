import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../../services/filter.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'taskbird-sort-dropdown',
  templateUrl: './sort-dropdown.component.html',
  styleUrls: ['./sort-dropdown.component.scss']
})
export class SortDropdownComponent implements OnInit {

  sort: string;
  private sub: Subscription;

  options = [
    { name: 'Date Due: Old to New', value: 'date_due_asc' },
    { name: 'Date Due: New to Old', value: 'date_due_desc' },
    { name: 'Date Created: Old to New', value: 'date_created_asc' },
    { name: 'Date Created: New to Old', value: 'date_created_desc' },
    { name: 'Project', value: 'project' }
  ];

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.sub = this.filterService.getSort().subscribe((sort: string) => {
      this.sort = sort;
    });

    setTimeout(() => this.filterService.setSort('date_due_asc'), 0);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  handleChange(sort) {
    this.filterService.setSort(sort);
  }
}
