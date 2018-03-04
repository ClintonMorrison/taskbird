import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class BrowserService {

  constructor() { }

  scrollToBottom() {
    $("html, body").animate({ scrollTop: $(document).height() }, 1000);
  }
}
