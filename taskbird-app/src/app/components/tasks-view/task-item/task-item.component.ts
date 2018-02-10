import { Component, OnInit, Input } from '@angular/core';
import { Task } from "../../../models/item";

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input()
  private task : Task;

  constructor() { }

  ngOnInit() {
  }

}
