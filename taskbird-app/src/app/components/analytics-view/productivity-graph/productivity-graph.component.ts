import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../services/item.service';
import { Task, StringTaskMap } from '../../../models/item';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';


@Component({
  selector: 'taskbird-productivity-graph',
  template: `
   <taskbird-graph
     title="Productivity"
     yTitle="Tasks"
     [data]="[createdTasksSeries, completedTaskSeries]">
   </taskbird-graph>
  `,
  styles: []
})
export class ProductivityGraphComponent implements OnInit {
  createdTasksSeries: any;
  completedTaskSeries: any;
  dayCreatedSub: Subscription;
  dayCompletedSub: Subscription;

  constructor(
    private taskService: TaskService
  ) {
    this.createdTasksSeries = this.createEmptySeries('Tasks Created');
    this.completedTaskSeries = this.createEmptySeries('Tasks Completed');

    this.dayCreatedSub = taskService.groupTasksByDayCreated().subscribe((tasksByDayCreated) => {
      console.log("CALLBACK CCALLED");
      const { x, y } = this.countTasksByDate(tasksByDayCreated);
      this.createdTasksSeries = { ...this.createdTasksSeries, x, y };
    });

    this.dayCompletedSub = taskService.groupTasksByDayCompleted().subscribe((tasksByDayCompleted) => {
      const { x, y } = this.countTasksByDate(tasksByDayCompleted);
      this.completedTaskSeries = { ...this.completedTaskSeries, x, y };
    });
  }

  countTasksByDate(tasksByDate: StringTaskMap) {
    const dates = _(tasksByDate).chain().keys().sort().value();
    const x = [];
    const y = [];

    for (const date of dates) {
      const tasks = tasksByDate[date];
      const nextCount = tasks.length + (_.last(y) ||  0);

      x.push(date);
      y.push(nextCount);
    }

    return { x, y };
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dayCreatedSub.unsubscribe();
    this.dayCompletedSub.unsubscribe();
  }

  createEmptySeries(name: string) {
    return { x: [], y: [], type: 'scatter', name, hoverinfo: 'y' };
  }
}
