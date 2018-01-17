import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../classes/menu-item';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  items = [
    { title: 'Dashboard', route: '/', icon: 'home' },
    { title: 'Items', route: '/items', icon: 'tasks' },
    { title: 'Calendar', route: '/calendar', icon: 'calendar' },
    { title: 'Projects', route: '/projects', icon: 'cubes' },
    { title: 'Analytics', route: '/analytics', icon: 'bar chart' },
    { title: 'Settings', route: '/settings', icon: 'settings' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
