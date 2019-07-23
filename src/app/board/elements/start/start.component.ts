import { Component, OnInit } from '@angular/core';

import { IProcessComponent } from '../../shared/models/process-component.model';
import { StartEvent } from './start-event.model';

@Component({
  selector: 'svg:svg[app-start]',
  template: `
    <svg [attr.x]="context.x" [attr.y]="context.y">
      <svg:circle [attr.cx]="radius" [attr.cy]="radius" [attr.r]="radius"></svg:circle>
    </svg>
  `,
  styles: [`
    circle {
      stroke: black;
      stroke-width: 2px;
      fill: white;
      fill-opacity: 0.95;
    }
  `],
})
export class StartComponent implements OnInit, IProcessComponent {
  context: StartEvent;
  radius: number;

  constructor() { }

  ngOnInit() {
    this.radius = Math.round((this.context.width + this.context.height) / 4);
  }

}
