import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'taskbird-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  @Input()
  private projectId: number;

  project: Project;
  sub: Subscription;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.sub = this.projectService.getProjectById(this.projectId)
      .subscribe((project) => this.project = project);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
