import { IFlowElement } from '../../shared/models/flow-element.model';
import { ICoords } from '../../shared/models/coords.model';

export class SequenceFlow implements IFlowElement {
  public id: string;
  public sourceRef: string;
  public targetRef: string;
  public waypoints: ICoords[];

  constructor(options: {
    id: string,
    sourceRef: string,
    targetRef: string,
    waypoints: ICoords[],
  }) {
    this.id = options.id;
    this.sourceRef = options.sourceRef;
    this.targetRef = options.targetRef;
    this.waypoints = options.waypoints;
  }
}
