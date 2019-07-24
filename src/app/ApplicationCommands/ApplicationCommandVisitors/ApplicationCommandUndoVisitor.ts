import { ApplicationCommandVisitor } from './ApplicationCommandVisitor';
import { IFlowElementsStorage } from '../../FlowElementEventsStorage/IFlowElementsStorage';
import { CreateTaskCommand } from '../CreateTaskCommand';
import { CreateStartEventCommand } from '../CreateStartEventCommand';
import { CreateEndEventCommand } from '../CreateEndEventCommand';
import { CreateGatewayCommand } from '../CreateGatewayCommand';
import { MoveCommand } from '../MoveCommand';
import { ICoords } from './../../board/shared/models/coords.model';

export class ApplicationCommandUndoVisitor
  extends ApplicationCommandVisitor {

  constructor(
    private flowElementsStorage: IFlowElementsStorage,
  ) {
    super();
  }

  public VisitTask(createTaskCommand: CreateTaskCommand): void {
    this.flowElementsStorage.Remove({
      id: createTaskCommand.id
    });
  }

  public VisitStartEvent(createStartEventCommand: CreateStartEventCommand): void {
    this.flowElementsStorage.Remove({
      id: createStartEventCommand.id
    });
  }

  public VisitEndEvent(createEndEventCommand: CreateEndEventCommand): void {
    this.flowElementsStorage.Remove({
      id: createEndEventCommand.id
    });
  }

  public VisitGateway(createGatewayCommand: CreateGatewayCommand): void {
    this.flowElementsStorage.Remove({
      id: createGatewayCommand.id
    });
  }

  public VisitMove(moveCommand: MoveCommand): void {
    const negativeCoords: ICoords = {
      x: -moveCommand.coords.x,
      y: -moveCommand.coords.y,
    };

    this.flowElementsStorage.MoveTo({
      id: moveCommand.id, 
      coords: negativeCoords
    });
  }
}
