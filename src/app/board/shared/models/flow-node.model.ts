import { IFlowElement } from './flow-element.model';

export class FlowNode implements IFlowElement {
  public id: string;
  public incoming: string[];
  public outgoing: string[];
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(options: {
    id: string,
    incoming: string[],
    outgoing: string[],
    x: number,
    y: number,
    width: number,
    height: number,
  }) {
    this.id = options.id;
    this.incoming = options.incoming;
    this.outgoing = options.outgoing;
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
  }
}
