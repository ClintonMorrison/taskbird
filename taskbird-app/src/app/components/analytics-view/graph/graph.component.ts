import { Component, OnInit, HostListener, Input } from '@angular/core';
import { uniqueId } from 'lodash';

declare var Plotly: any;

@Component({
  selector: 'taskbird-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  private id: string;
  
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

    if (this.xTitle) {
      layout.xaxis = { title: this.xTitle };
    }

    if (this.yTitle) {
      layout.yaxis = { title: this.yTitle };
    }

    var options = {
      displayModeBar: false
    };

    setTimeout(() => {
      Plotly.newPlot(this.id, this.data, layout, options);
    }, 0);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    Plotly.Plots.resize(this.id);
  }
}
