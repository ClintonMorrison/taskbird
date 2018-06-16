import { Component, OnInit, Input , ViewChild } from '@angular/core';
import { Task } from "../../../models/item";
import { utc } from 'moment';
import { TaskService } from '../../../services/item.service';
import { Subscription } from 'rxjs/Subscription';
import { SidebarComponent } from '../../base/sidebar/sidebar.component';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input()
  taskId: number;

  task: Task;

  private taskSub: Subscription;
  private filterProjectSub: Subscription;

  showProjectIcon: boolean;

  constructor(
    private taskService: TaskService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.taskSub = this.taskService.getTaskById(String(this.taskId))
      .subscribe(task => this.task = task);
    
    this.filterProjectSub = this.filterService.getFilterProject().subscribe(
      (project) => (this.showProjectIcon = !project)
    );
  }

  ngOnDestroy() {
    this.taskSub.unsubscribe();
    this.filterProjectSub.unsubscribe();
  }

  onSelect(event) {
    event.preventDefault();
    this.filterService.setActiveTask(this.task);
  }

  getDateDue(): string {
    return this.task.date_due ? utc(this.task.date_due).format('MMM DD') : ''
  }

  getDescription(): string {
    return this.task.description;
  }
}
