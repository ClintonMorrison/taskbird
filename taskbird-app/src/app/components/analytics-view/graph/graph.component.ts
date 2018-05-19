import { Component, OnInit, HostListener, Input } from '@angular/core';
import { uniqueId, debounce } from 'lodash';

declare var Plotly: any;

@Component({
  selector: 'taskbird-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  id: string;
  
  @Input()
  layout: object;

  @Input()
  data: Array<object>;

  @Input()
  title: string;

  @Input()
  xTitle: string;

  @Input()
  yTitle: string;

  builtLayout: any;
  builtOptions: any;

  constructor() {
    this.id = uniqueId('graph-');
  }

  ngOnInit() {
    let layout: any = {
      showlegend: true,
      legend: { "orientation": "h" },
      margin: {
        l: 50,
        r: 0,
        b: 15,
        t: 5,
        pad: 0
      },
    };

    if (this.layout) {
      layout = { ...layout, ...this.layout }
    }

    if (!layout.yaxis) {
      layout.yaxis = {};
    }

    if (!layout.xaxis) {
      layout.xaxis = {};
    }

    layout.yaxis.fixedrange = true;
    layout.xaxis.fixedrange = true;

    if (this.xTitle) {
      layout.xaxis.xTitle = this.xTitle;
    }

    if (this.yTitle) {
      layout.yaxis.title = this.yTitle;
    }

    var options = {
      displayModeBar: false
    };

    this.builtLayout = layout;
    this.builtOptions = options;

    setTimeout(() => {
      const x = Plotly.newPlot(this.id, this.data, this.builtLayout, this.builtOptions);
    }, 0);
  }

  ngOnChanges(changes) {
    if (changes.data) {
      setTimeout(() => {
        Plotly.purge(this.id);
        Plotly.newPlot(this.id, this.data, this.builtLayout, this.builtOptions);
      }, 0);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    Plotly.Plots.resize(this.id);
  }
}
