import { Component } from '@angular/core';
import { TaskService } from './services/item.service';
import { ProjectService } from './services/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TaskBird';

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService
  ) {
    taskService.getTasks().first().subscribe();
    projectService.getProjects().first().subscribe();
  }
}
