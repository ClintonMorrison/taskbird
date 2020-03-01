import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../models/project';

@Component({
  selector: 'taskbird-project-heading',
  templateUrl: './project-heading.component.html',
  styleUrls: ['./project-heading.component.scss']
})
export class ProjectHeadingComponent implements OnInit {

  @Input()
  project: Project;

  constructor() { }

  ngOnInit() {
  }

}
