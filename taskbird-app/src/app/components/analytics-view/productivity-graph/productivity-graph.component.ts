import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../services/item.service';
import { Task, StringTaskMap } from '../../../models/item';
import * as _ from 'lodash';


@Component({
  selector: 'taskbird-productivity-graph',
  template: `
   <taskbird-graph
     title="Productivity"
     yTitle="Tasks"
     [data]="getData()">
   </taskbird-graph>
  `,
  styles: []
})
export class ProductivityGraphComponent implements OnInit {
  createdTasksSeries: any;
  completedTaskSeries: any;

  constructor(
    private taskService: TaskService
  ) {
    this.createdTasksSeries = this.createEmptySeries('Tasks Created');
    this.completedTaskSeries = this.createEmptySeries('Tasks Completed');

    taskService.groupTasksByDayCreated().subscribe((tasksByDayCreated) => {
      const { x, y } = this.countTasksByDate(tasksByDayCreated);
      this.createdTasksSeries = { ...this.createdTasksSeries, x, y };
    });

    taskService.groupTasksByDayCompleted().subscribe((tasksByDayCompleted) => {
      const { x, y } = this.countTasksByDate(tasksByDayCompleted);
      this.completedTaskSeries = { ...this.completedTaskSeries, x, y };
    });
  }

  getData() {
    return [
      this.createdTasksSeries,
      this.completedTaskSeries
    ];
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

  createEmptySeries(name: string) {
    return { x: [], y: [], type: 'scatter', name, hoverinfo: 'y' };
  }
}
