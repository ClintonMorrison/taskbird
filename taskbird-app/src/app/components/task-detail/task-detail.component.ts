import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../classes/item';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  @Input() item: Task;

  constructor() { }

  ngOnInit() {
  }

}
