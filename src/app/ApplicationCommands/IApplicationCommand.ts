import { ApplicationCommandVisitor } from './ApplicationCommandVisitors/ApplicationCommandVisitor';

export interface IApplicationCommand {
  Visit(
    applicationCommandVisitor: ApplicationCommandVisitor): void;
}
