import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../models/menu-item';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  items = [
    { title: 'Dashboard', route: '/', icon: 'database' },
    { title: 'Tasks', route: '/tasks', icon: 'check square' },
    { title: 'Calendar', route: '/calendar', icon: 'window maximize' },
    { title: 'Projects', route: '/projects', icon: 'folder' },
    { title: 'Analytics', route: '/analytics', icon: 'pie chart' },
    { title: 'Settings', route: '/settings', icon: 'setting' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
