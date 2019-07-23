import { CreateTaskCommand } from '../CreateTaskCommand';
import { CreateStartEventCommand } from '../CreateStartEventCommand';
import { CreateEndEventCommand } from '../CreateEndEventCommand';
import { CreateGatewayCommand } from '../CreateGatewayCommand';
import { MoveCommand } from '../MoveCommand';

export abstract class ApplicationCommandVisitor {
  public abstract VisitTask(createTaskCommand: CreateTaskCommand): void;
  public abstract VisitStartEvent(createStartEventCommand: CreateStartEventCommand): void;
  public abstract VisitEndEvent(createEndEventCommand: CreateEndEventCommand): void;
  public abstract VisitGateway(createGatewayCommand: CreateGatewayCommand): void;
  public abstract VisitMove(moveCommand: MoveCommand): void;
}
