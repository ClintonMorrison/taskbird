import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'taskbird-create-task-button',
  template: `
  <button class="ui labeled primary icon button">
    <i class="plus icon"></i>
    New Task
  </button>
  `,
  styles: []
})
export class CreateTaskButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
