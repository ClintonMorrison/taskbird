import { Component, OnInit, Input, EventEmitter, Output, HostListener } from '@angular/core';
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

  @Input()
  hideButtons: boolean;

  @Output()
  modalClosed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    this.id = uniqueId('modal-');
    setTimeout(() => {
      this.getModal().modal({
        onApprove: () => this.modalClosed.emit(true),
        onDeny: () => this.modalClosed.emit(false)
      });
    }, 0);
  }

  showModal() {
    this.getModal().modal('hide');
    setTimeout(() => this.getModal().modal('show'), 0);
  }

  hideModal() {
    this.getModal().modal('hide');
  }

  getModal() {
    return $(`#${this.id}`);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.hideModal();
    }
  }

}
