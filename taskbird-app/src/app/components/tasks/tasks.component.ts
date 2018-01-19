import { Component, OnInit } from '@angular/core';
import { Task } from '../../classes/item';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class Tasks implements OnInit {
  items: Task[];
  selectedItem: Task;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItems();
  }

  getProjectIcon(item: Task): string {
    if (item.project) {
      return item.project.icon;
    }

    return '';
  }

  onSelect(item: Task): void {
    this.selectedItem = item;
  }

  getItems(): void {
    this.itemService.getTasks()
      .subscribe(items => this.items = items);
  }

}
