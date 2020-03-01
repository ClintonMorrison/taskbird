import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BrowserService } from '../../../browser.service';
import { uniqueId } from 'lodash';

declare var $: any;

export interface DropdownOption {
  name: string,
  value: string,
  icon: string
};

@Component({
  selector: 'taskbird-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  id: string;

  @Input()
  name: string;

  @Input()
  value: string;

  @Input()
  options: DropdownOption[];

  @Output()
  selectionChange = new EventEmitter<string>();

  isMobile: boolean;

  constructor(
    private browserService: BrowserService
  ) {
    this.id = uniqueId('taskbird-sidebar-');
  }

  ngOnInit() {
    this.isMobile = this.browserService.isMobile();
    setTimeout(
      () => {
        if (!this.isMobile) {
          this.getElement()
            .dropdown({
              onChange: (value) => this.selectionChange.emit(value)
            })
            .dropdown('set selected', this.value);
        }
      },
      0
    );
  }

  ngOnDestroy() {
    this.getElement().remove();
  }

  handleChange(e) {
    this.selectionChange.emit(this.value);
  }

  private getElement(): any {
    return $(`#${this.id}`);
  }
}
