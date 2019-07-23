import { Component, OnInit } from '@angular/core';

import { IProcessComponent } from '../../shared/models/process-component.model';
import { EndEvent } from './end-event.model';

@Component({
  selector: 'svg:svg[app-end]',
  template: `
    <svg [attr.x]="context.x" [attr.y]="context.y">
      <svg:circle [attr.cx]="radius" [attr.cy]="radius" [attr.r]="radius"></svg:circle>
    </svg>
  `,
  styles: [`
    circle {
      stroke: black;
      stroke-width: 4px;
      fill: white;
      fill-opacity: 0.95;
    }
  `],
})
export class EndComponent implements OnInit, IProcessComponent {
  context: EndEvent;
  radius: number;

  constructor() { }

  ngOnInit() {
    this.radius = Math.round((this.context.width + this.context.height) / 4);
  }

}
