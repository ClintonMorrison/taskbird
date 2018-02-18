import { Component, OnInit } from '@angular/core';
import { StringTaskMap, Task } from '../../../models/item';
import * as _ from 'lodash';
import { utc } from 'moment';
import { TaskService } from '../../../services/item.service';

@Component({
  selector: 'taskbird-project-completion-time-graph',
  template: `
   <taskbird-graph
     title="Average Completion Time by Project"
     yTitle="Days Task is Open"
     [layout]="layout"
     [data]="getData()">
   </taskbird-graph>
  `,
  styles: []
})
export class ProjectCompletionTimeGraphComponent implements OnInit {
  completedTaskSeries: any;

  layout: object;

  constructor(
    private taskService: TaskService
  ) {
    this.completedTaskSeries = this.createEmptySeries('Tasks Completed');

    this.layout = {
      showlegend: false,
      margin: {
        l: 50,
        r: 0,
        b: 75,
        t: 5,
        pad: 0
      }
    };

    taskService.groupTasksByProject().subscribe((tasksByProject) => {
      const completedTasks = this.getTimeOpenByProject(tasksByProject);
      this.completedTaskSeries = { ...this.completedTaskSeries, x: completedTasks.x, y: completedTasks.y };
    });
  }

  ngOnInit() {
  }

  getData() {
    return [
      this.completedTaskSeries
    ];
  }

  createEmptySeries(name: string) {
    return { x: [], y: [], type: 'bar', name, hoverinfo: 'y' };
  }

  getTimeOpenByProject(tasksByProject: StringTaskMap) {
    const projects = _(tasksByProject).chain().keys().sort().value();
    const x = [];
    const y = [];

    for (const project of projects) {
      const averageTimeOpen = _(tasksByProject[project])
        .chain()
        .filter((task: Task) => task.done)
        .map((task: Task) => ProjectCompletionTimeGraphComponent.getDaysOpen(task))
        .mean()
        .value();

      x.push(project);
      y.push(averageTimeOpen);
    }

    return { x, y };
  }

  static getDaysOpen(task: Task) {
    const created = utc(task.date_created);
    const closed = utc(task.date_modified);
    return closed.diff(created, 'days');
  }
}
