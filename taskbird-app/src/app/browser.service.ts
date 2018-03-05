import { Injectable } from '@angular/core';
import * as _ from 'lodash';

declare var $: any;

@Injectable()
export class BrowserService {

  constructor() {
    this.scrollToBottom = _.debounce(this.scrollToBottom, 250);
  }

  scrollToBottom() {
    $("html, body").animate({ scrollTop: $(document).height() }, 0);
  }
}
