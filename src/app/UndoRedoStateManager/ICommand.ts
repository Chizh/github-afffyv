export interface ICommand<TVisitor> {
  Visit(visitor: TVisitor): void;
}
