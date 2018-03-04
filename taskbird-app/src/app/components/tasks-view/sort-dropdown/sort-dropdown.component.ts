import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'taskbird-sort-dropdown',
  templateUrl: './sort-dropdown.component.html',
  styleUrls: ['./sort-dropdown.component.scss']
})
export class SortDropdownComponent implements OnInit {

  sort: string;

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.filterService.getSort().subscribe((sort: string) => {
      this.sort = sort;
    });

    this.filterService.setSort('date_due_asc');
  }

  handleChange(e) {
    this.filterService.setSort(this.sort);
  }
}
