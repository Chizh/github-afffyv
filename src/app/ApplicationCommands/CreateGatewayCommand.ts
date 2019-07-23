import { IApplicationCommand } from './IApplicationCommand';
import { ApplicationCommandVisitor } from './ApplicationCommandVisitors/ApplicationCommandVisitor';

export class CreateGatewayCommand
  implements IApplicationCommand {
  constructor(
    public id: string,
    public x: number,
    public y: number) {
  }

  public Visit(
    applicationCommandVisitor: ApplicationCommandVisitor): void {
    applicationCommandVisitor.VisitGateway(this);
  }
}
