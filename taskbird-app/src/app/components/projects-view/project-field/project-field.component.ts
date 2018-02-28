import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'taskbird-project-field',
  templateUrl: './project-field.component.html',
  styleUrls: ['./project-field.component.scss']
})
export class ProjectFieldComponent implements OnInit {

  @Input()
  name: string;

  constructor() { }

  ngOnInit() {
  }

}
