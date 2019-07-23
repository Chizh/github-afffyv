import { Component, OnInit, Input } from '@angular/core';

import { IProcessComponent } from '../../shared/models/process-component.model';
import { ICoords } from '../../shared/models/coords.model';
import { Gateway } from './gateway.model';

@Component({
  selector: 'svg:svg[app-gateway]',
  template: `
    <svg [attr.x]="context.x" [attr.y]="context.y">
      <polygon
        attr.points="{{ top | coords }} {{ right | coords }} {{ bottom | coords }} {{ left | coords }}"></polygon>
    </svg>
  `,
  styles: [`
    polygon {
      stroke: black;
      stroke-width: 2px;
      fill: white;
      fill-opacity: 0.95;
    }
  `],
})
export class GatewayComponent implements IProcessComponent, OnInit {
  context: Gateway;

  top: ICoords;
  right: ICoords;
  bottom: ICoords;
  left: ICoords;

  constructor() { }

  ngOnInit() {
    const halfWidth = Math.round(this.context.width / 2);
    const halfHeight = Math.round(this.context.height / 2);

    this.top = { x: halfWidth, y: 0 };
    this.right = { x: this.context.width, y: halfHeight };
    this.bottom = { x: halfWidth, y: this.context.height };
    this.left = { x: 0, y: halfHeight };
  }

}
