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

  handleChange(e) {
    this.filterService.setSort(this.sort);
  }
}
