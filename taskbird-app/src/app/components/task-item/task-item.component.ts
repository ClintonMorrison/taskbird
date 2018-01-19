import { Component, OnInit, Input } from '@angular/core';
import { Task } from "../../classes/item";
import { ItemService } from "../../services/item.service";

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input()
  private taskId : number;

  constructor() { }

  getTask() : Task {
    return null;
  }

  ngOnInit() {
  }

}
