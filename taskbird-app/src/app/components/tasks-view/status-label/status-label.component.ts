import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/item';

@Component({
  selector: 'taskbird-status-label',
  template: `
    <span *ngIf="task.done" class="ui green label">DONE</span>
    
    <!-- TODO:
    <span class="ui red label">OVERDUE</span>
    <span class="ui pink label">DUE SOON</span>
    -->
    <span *ngIf="!task.done"class="ui grey label">NOT DONE</span>
  `,
  styles: []
})
export class StatusLabelComponent implements OnInit {

  @Input()
  task: Task;

  constructor() { }

  ngOnInit() {
  }

}
