import { Component, OnInit, Input } from '@angular/core';
import { FilterService } from '../../../services/filter.service';
import { Subscription } from 'rxjs/Subscription';
import { Task } from '../../../models/item';

@Component({
  selector: 'taskbird-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input()
  taskIds: number[];

  numberToShow: number = 10;

  @Input()
  showCompletedToggle: boolean;

  @Input()
  noContentMessage: string;

  activeTask: Task;

  sub: Subscription;

  constructor(private filterService: FilterService) {
  }


  ngOnInit() {
    this.sub = this.filterService.getActiveTask().subscribe(
      (activeTask: Task) => this.activeTask = activeTask
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  showMore() {
    this.numberToShow += 10;
  }

}
