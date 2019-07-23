import { ICommand } from './ICommand';

export class UndoRedoStateManager<
    TCommand extends ICommand<TVisitor>,
    TVisitor> {

  constructor(
    private applyVisitor: TVisitor,
    private undoVisitor: TVisitor,
  ) {}

  private appliedCommandStack: TCommand[] = [];
  private unduedCommandStack: TCommand[] = [];

  public Apply(command: TCommand): void {
    this.appliedCommandStack.push(command);
    command.Visit(this.applyVisitor);
    this.unduedCommandStack = [];
  }

  public Undo(): void {
    const command = this.appliedCommandStack
      .pop();

    if (command) {
      this.unduedCommandStack.push(command);
      command.Visit(this.undoVisitor);
    }
  }

  public Redo(): void {
    const command = this.unduedCommandStack.pop();

    if (command) {
      command.Visit(this.applyVisitor);
      this.appliedCommandStack.push(command);
    }
  }
}
