import { Component, OnInit, Input } from '@angular/core';

const HIDE_TIMEOUT = 3000;
const SWITCH_TIMEOUT = 750;

@Component({
  selector: 'taskbird-saving-indicator',
  templateUrl: './saving-indicator.component.html',
  styleUrls: ['./saving-indicator.component.scss']
})

export class SavingIndicatorComponent implements OnInit {

  @Input()
  status: string;
  displayStatus: string;

  visible: boolean;

  hideTimeoutId;
  updateStatusTimeoutId;

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  setDisplayStatus(status) {
    if (status === 'saving') {
      this.displayStatus = status;
      return;
    }

    this.updateStatusTimeoutId = setTimeout(
      () => this.displayStatus = status,
      SWITCH_TIMEOUT
    );
  }

  hideAfterTimeout() {
    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
    }

    this.hideTimeoutId = setTimeout(
      () => this.hide(),
      HIDE_TIMEOUT
    );
  }

  ngOnChanges(changes) {
    if (changes.status) {
      this.setDisplayStatus(changes.status.currentValue);
      this.show();
      const { currentValue } = changes.status;
      if (currentValue === 'saved' || currentValue === 'error') {
        this.hideAfterTimeout();
      }
    }
  }
}
