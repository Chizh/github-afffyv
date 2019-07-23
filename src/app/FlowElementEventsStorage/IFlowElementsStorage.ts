import { IFlowElement } from './../board/shared/models/flow-element.model';
import { ICoords } from '../board/shared/models/coords.model';

export interface IFlowElementsStorage {
  Push(flowElement: IFlowElement): void;
  Remove(option: { id: string } ): void;
  Get(): IFlowElement[];
  GetById(id: string): IFlowElement;
  MoveTo(id: string, coords: ICoords): void;
}
