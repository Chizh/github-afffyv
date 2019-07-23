import { ICoords } from './../board/shared/models/coords.model';
import { IApplicationCommand } from './IApplicationCommand';
import { ApplicationCommandVisitor } from './ApplicationCommandVisitors/ApplicationCommandVisitor';

export class MoveCommand
  implements IApplicationCommand {
  constructor(
    public id: string,
    public coords: ICoords) {
  }

  public Visit(
    applicationCommandVisitor: ApplicationCommandVisitor): void {
    applicationCommandVisitor.VisitMove(this);
  }
}
