import { Component, OnInit, Input } from '@angular/core';
import { uniqueId } from 'lodash';

declare var $: any;


@Component({
  selector: 'taskbird-project-progress-bar',
  template: `
    <div 
      [id]="id"
      class="ui indicating progress">
      <div class="bar"></div>
      <div class="label">{{doneTasks}} of {{totalTasks}} tasks done</div>
    </div>
  `,
  styles: []
})
export class ProjectProgressBarComponent implements OnInit {

  @Input()
  doneTasks: number;

  @Input()
  totalTasks: number;

  id: string;

  constructor() {
    this.id = uniqueId('task-progressbar-');
  }

  setProgress() {
    setTimeout(() => {
      $(`#${this.id}`).progress({ percent: this.calculatePercent() });
    }, 0);
  }

  ngOnInit() {
    this.setProgress();
  }

  ngOnChanges(changes) {
    if (changes.doneTasks || changes.totalTasks) {
      this.setProgress();
    }
  }


  calculatePercent(): number {
    return Math.floor(this.doneTasks / this.totalTasks * 100);
  }

}
