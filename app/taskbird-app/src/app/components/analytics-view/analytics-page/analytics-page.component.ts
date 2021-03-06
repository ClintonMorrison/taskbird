import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Task, StringTaskMap } from '../../../models/item';

@Component({
  selector: 'taskbird-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements OnInit {
  constructor(
    private taskService: TaskService
  ) {
  }

  ngOnInit() {
  }

}
