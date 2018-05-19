import { Component, OnInit } from '@angular/core';
import { StringTaskMap, Task } from '../../../models/item';
import * as _ from 'lodash';
import { utc } from 'moment';
import { TaskService } from '../../../services/item.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'taskbird-week-day-graph',
  template: `
   <taskbird-graph
     title="Tasks by Day of Week"
     yTitle="Tasks"
     [data]="[this.createdTasksSeries, this.completedTaskSeries]">
   </taskbird-graph>
  `,
  styles: []
})
export class WeekDayGraphComponent implements OnInit {
  createdTasksSeries: any;
  completedTaskSeries: any;

  createdSub: Subscription;
  completedSub: Subscription;

  layout: object;

  constructor(
    private taskService: TaskService
  ) {
    this.createdTasksSeries = this.createEmptySeries('Tasks Created');
    this.completedTaskSeries = this.createEmptySeries('Tasks Completed');

    this.createdSub = taskService
      .groupTasksByCallback(WeekDayGraphComponent.getWeekDayCreated)
      .subscribe((tasksByWeekdayCreated) => {
        const createdTasks = this.countTasksByWeekday(tasksByWeekdayCreated);
        this.createdTasksSeries = { ...this.createdTasksSeries, x: createdTasks.x, y: createdTasks.y };
      });
    
    this.completedSub = taskService
      .groupTasksByCallback(WeekDayGraphComponent.getWeekDayTaskCompleted)
      .subscribe((tasksByWeekdayCompleted) => {
        const completedTasks = this.countTasksByWeekday(tasksByWeekdayCompleted);
        this.completedTaskSeries = { ...this.completedTaskSeries, x: completedTasks.x, y: completedTasks.y };
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.createdSub.unsubscribe();
    this.completedSub.unsubscribe();
  }

  createEmptySeries(name: string) {
    return { x: [], y: [], type: 'bar', name, hoverinfo: 'y' };
  }

  countTasksByWeekday(tasksByWeekday: StringTaskMap) {
    const weekdays = _(tasksByWeekday).chain().keys().sort().value();
    const x = [];
    const y = [];

    for (const weekday of weekdays) {
      x.push(weekday);
      y.push(tasksByWeekday[weekday].length);
    }

    return { x, y };
  }

  static getWeekDayCreated(task: Task) {
    return task.date_created && utc(task.date_created).format('ddd');
  }

  static getWeekDayTaskCompleted(task: Task) {
    return task.done && utc(task.date_modified).format('ddd');
  }
}
