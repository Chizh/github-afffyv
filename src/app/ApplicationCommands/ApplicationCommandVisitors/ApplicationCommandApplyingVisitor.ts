import { ApplicationCommandVisitor } from './ApplicationCommandVisitor';
import { IFlowElementsStorage } from '../../FlowElementEventsStorage/IFlowElementsStorage';
import { CreateTaskCommand } from '../CreateTaskCommand';
import { CreateStartEventCommand } from '../CreateStartEventCommand';
import { CreateEndEventCommand } from '../CreateEndEventCommand';
import { CreateGatewayCommand } from '../CreateGatewayCommand';
import { MoveCommand } from './../MoveCommand';

import { Task } from '../../board/elements/task/task.model';
import { StartEvent } from '../../board/elements/start/start-event.model';
import { EndEvent } from '../../board/elements/end/end-event.model';
import { Gateway } from '../../board/elements/gateway/gateway.model';

export class ApplicationCommandApplyingVisitor
  extends ApplicationCommandVisitor {

  constructor(
    private flowElementsStorage: IFlowElementsStorage,
  ) {
    super();
  }

  public VisitTask(createTaskCommand: CreateTaskCommand): void {
    this.flowElementsStorage
      .Push(
        new Task({
          id: createTaskCommand.id,
          incoming: null,
          outgoing: null,
          x: createTaskCommand.x,
          y: createTaskCommand.y,
          width: 100,
          height: 80,
        })
      );
  }

  public VisitStartEvent(createStartEventCommand: CreateStartEventCommand): void {
    this.flowElementsStorage
      .Push(
        new StartEvent({
          id: createStartEventCommand.id,
          incoming: null,
          outgoing: null,
          x: createStartEventCommand.x,
          y: createStartEventCommand.y,
          width: 36,
          height: 36,
        })
      );
  }

  public VisitEndEvent(createEndEventCommand: CreateEndEventCommand): void {
    this.flowElementsStorage
      .Push(
        new EndEvent({
          id: createEndEventCommand.id,
          incoming: null,
          outgoing: null,
          x: createEndEventCommand.x,
          y: createEndEventCommand.y,
          width: 36,
          height: 36,
        })
      );
  }

  public VisitGateway(createGatewayCommand: CreateGatewayCommand): void {
    this.flowElementsStorage
      .Push(
        new Gateway({
          id: createGatewayCommand.id,
          incoming: null,
          outgoing: null,
          x: createGatewayCommand.x,
          y: createGatewayCommand.y,
          width: 50,
          height: 50,
        })
      );
  }

  public VisitMove(moveCommand: MoveCommand): void {
    this.flowElementsStorage
      .MoveTo({
          id: moveCommand.id,
          coords: moveCommand.coords
        });
  }
}
