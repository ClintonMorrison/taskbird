import { Component, OnInit } from '@angular/core';
import { StringTaskMap, Task } from '../../../models/item';
import * as _ from 'lodash';
import { TaskService } from '../../../services/item.service';

@Component({
  selector: 'taskbird-projects-graph',
  template: `
   <taskbird-graph
     title="Tasks by Project"
     yTitle="Tasks"
     [layout]="layout"
     [data]="getData()">
   </taskbird-graph>
  `,
  styles: []
})
export class ProjectsGraphComponent implements OnInit {
  createdTasksSeries: any;
  completedTaskSeries: any;

  layout: object;

  constructor(
    private taskService: TaskService
  ) {
    this.createdTasksSeries = this.createEmptySeries('Tasks Created');
    this.completedTaskSeries = this.createEmptySeries('Tasks Completed');

    this.layout = {
      legend: {
        orientation: "h",
        xanchor: "center",
        y: -0.2,
        x: 0.5
      },
      margin: {
        l: 50,
        r: 0,
        b: 75,
        t: 5,
        pad: 0
       }
    };

    taskService.groupTasksByProject().subscribe((tasksByProject) => {
      console.log(tasksByProject);
      const createdTasks = this.countTasksByProject(tasksByProject, () => true);
      this.createdTasksSeries = { ...this.createdTasksSeries, x: createdTasks.x, y: createdTasks.y };

      const completedTasks = this.countTasksByProject(tasksByProject, (task: Task) => task.done);
      this.completedTaskSeries = { ...this.completedTaskSeries, x: completedTasks.x, y: completedTasks.y };
    });
  }

  ngOnInit() {
  }

  getData() {
    return [
      this.createdTasksSeries,
      this.completedTaskSeries
    ];
  }

  createEmptySeries(name: string) {
    return { x: [], y: [], type: 'bar', name, hoverinfo: 'y' };
  }

  countTasksByProject(tasksByProject: StringTaskMap, filterCallback: Function) {
    const projects = _(tasksByProject).chain().keys().sort().value();
    const x = [];
    const y = [];

    for (const project of projects) {
      const tasks =  _.filter(tasksByProject[project], filterCallback);

      x.push(project);
      y.push(tasks.length);
    }

    return { x, y };
  }
}
