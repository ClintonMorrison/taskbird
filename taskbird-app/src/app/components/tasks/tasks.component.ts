import { Component, OnInit } from '@angular/core';
import { Item } from '../../classes/item';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class Tasks implements OnInit {
  items: Item[];
  selectedItem: Item;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItems();
  }

  getProjectIcon(item: Item): string {
    if (item.project) {
      return item.project.icon;
    }

    return '';
  }

  onSelect(item: Item): void {
    this.selectedItem = item;
  }

  getItems(): void {
    this.itemService.getItems()
      .subscribe(items => this.items = items);
  }

}
