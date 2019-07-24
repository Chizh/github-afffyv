import { IFlowElement } from './../board/shared/models/flow-element.model';
import { ICoords } from '../board/shared/models/coords.model';

export interface IFlowElementsStorage {
  Push(option: { flowElement: IFlowElement }): void;
  Remove(option: { id: string } ): void;
  Get(): IFlowElement[];
  GetById(option: { id: string; }): IFlowElement
  MoveTo(option: { id: string, coords: ICoords }): void;
}
