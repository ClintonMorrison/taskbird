import { Component, OnInit, Input } from '@angular/core';
import { uniqueId } from 'lodash';

declare var $: any;

@Component({
  selector: 'taskbird-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  id: string;

  @Input()
  title: string;

  constructor() { }

  ngOnInit() {
    this.id = uniqueId('modal-');
    setTimeout(() => this.getModal().modal(), 0);
  }

  showModal() {
    this.getModal().modal('show');
  }

  hideModal() {
    this.getModal().modal('hide');
  }

  getModal() {
    return $(`#${this.id}`);
  }

}
