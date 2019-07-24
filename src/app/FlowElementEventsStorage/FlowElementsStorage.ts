import { IFlowElementsStorage } from './IFlowElementsStorage';
import { IFlowElement } from '../board/shared/models/flow-element.model';
import { IDatabase } from '../board/shared/models/database.model';
import { ICoords } from '../board/shared/models/coords.model';
import { FlowNode } from './../board/shared/models/flow-node.model';
import { SequenceFlow } from '../board/elements/sequence-flow/sequence-flow.model';

export class FlowElementsStorage
  implements IFlowElementsStorage {

  flowElements: IFlowElement[] = [];

  constructor(private db: IDatabase) {
    this.db
      .getEvents()
      .subscribe((flowElements: IFlowElement[]) => {
        this.flowElements = flowElements;
      });
  }

  public Push(option: { flowElement: IFlowElement }): void {
    this.flowElements
      .push(option.flowElement);
  }

  public Remove(option: { id: string; }): void {
    this.flowElements = this.flowElements
      .filter(
        (el) => el.id !== option.id
      );
  }

  public Get(): IFlowElement[] {
    return this.flowElements;
  }

  public GetById(option: { id: string; }): IFlowElement {
    return this.flowElements.find(
      (el) => el.id === option.id
    );
  }

  public MoveTo(option: {id: string, coords: ICoords}): void {
    const flowNode: FlowNode = this.GetById({ id: option.id }) as FlowNode;
    const incomingArrows: SequenceFlow[] = (flowNode.incoming || []).map((seqFlowId) => {
      return this.GetById({ id: seqFlowId }) as SequenceFlow;
    });
    const outgoingArrows: SequenceFlow[] = (flowNode.outgoing || []).map((seqFlowId) => {
      return this.GetById({ id: seqFlowId }) as SequenceFlow;
    });

    flowNode.x += option.coords.x;
    flowNode.y += option.coords.y;

    incomingArrows.forEach((seqFlow) => {
      seqFlow.waypoints = seqFlow.waypoints.map((waypoint, index, source) => {
        if (index === (source.length - 1)) {
          return {
            x: waypoint.x + option.coords.x,
            y: waypoint.y + option.coords.y,
          };
        }

        return waypoint;
      });
    });

    outgoingArrows.forEach((seqFlow) => {
      seqFlow.waypoints = seqFlow.waypoints.map((waypoint, index) => {
        if (index === 0) {
          return {
            x: waypoint.x + option.coords.x,
            y: waypoint.y + option.coords.y,
          };
        }

        return waypoint;
      });
    });
  }
}
