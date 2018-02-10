import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'taskbird-project-filter',
  template: `
    <div class="ui secondary pointing menu">
      <a class="item">
      Home
      </a>
      <a class="item active">
      Messages
      </a>
      <a class="item">
      Friends
      </a>
    </div>

  `,
  styles: []
})
export class ProjectFilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
