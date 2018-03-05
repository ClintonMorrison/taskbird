import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/item';

@Component({
  selector: 'taskbird-project-icon',
  template: `
    <i *ngIf="task.project" class="icon {{ task.project.icon }} {{ task.project.color }}"></i>
    <i *ngIf="!task.project" class="circle outline icon"></i>
  `,
  styles: []
})
export class ProjectIconComponent implements OnInit {

  @Input()
  task: Task;

  constructor() { }

  ngOnInit() {
  }

}
