import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../models/project';
import { utc } from 'moment';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'taskbird-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input()
  doneTasks: number;

  @Input()
  totalTasks: number;

  @Input()
  project: Project;

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit() {
  }

  getDateCreated() {
    return utc(this.project.date_created).format('MMM DD, YYYY');
  }

  editProject() {
    this.filterService.setActiveProject(this.project);
  }
}
