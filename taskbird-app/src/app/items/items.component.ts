import { Component, OnInit } from '@angular/core';
import { Item } from '../Item';
import { ITEMS } from '../mock-items';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items = ITEMS;
  selectedItem: Item;

  constructor() { }

  ngOnInit() {
  }

  onSelect(item: Item): void {
    this.selectedItem = item;
  }

}
