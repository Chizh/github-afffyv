import { Observable } from 'rxjs';

import { IFlowElement } from './flow-element.model';

export interface IDatabase {
  getEvents(): Observable<IFlowElement[]>;
}
