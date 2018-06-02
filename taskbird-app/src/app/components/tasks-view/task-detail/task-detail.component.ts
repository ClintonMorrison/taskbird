import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/item';
import { TaskService } from '../../../services/item.service';
import { Subscription } from 'rxjs/Subscription';
import { BrowserService } from '../../../browser.service';
import { Project } from '../../../models/project';


@Component({
  selector: 'taskbird-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  @Input() 
  taskId: number;

  task: Task;

  private taskSub: Subscription;

  constructor(
    private taskService: TaskService,
    private browserService: BrowserService
  ) { }

  ngOnInit() {
    this.refreshTask();
  }

  ngOnChanges(changes) {
    if (changes.taskId) {
      this.refreshTask();
    }
  }

  ngOnDestroy() {
    if (this.taskSub) {
      this.taskSub.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.browserService.focusOnId('task-title');
  }

  updateTask() {
    this.taskService.updateTask(this.task);
  }

  updateTaskProject(project: Project) {
    const updatedTask = { ...this.task, project };
    this.taskService.updateTask(updatedTask);
  }

  private refreshTask() {
    if (this.taskSub) {
      this.taskSub.unsubscribe();
    }

    this.taskSub = this.taskService.getTaskById(String(this.taskId))
      .subscribe(task => this.task = task);
  }

}
