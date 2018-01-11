import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../menu-item';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  items = [
    { title: 'Tasks', icon: 'tasks' },
    { title: 'Calendar', icon: 'calendar' },
    { title: 'Projects', icon: 'cubes' },
    { title: 'Analytics', icon: 'bar chart' },
    { title: 'Settings', icon: 'settings' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
