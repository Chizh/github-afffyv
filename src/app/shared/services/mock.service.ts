import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IDatabase } from '../../board/shared/models/database.model';
import { IFlowElement } from '../../board/shared/models/flow-element.model';
import { StartEvent } from './../../board/elements/start/start-event.model';
import { EndEvent } from './../../board/elements/end/end-event.model';
import { Task } from './../../board/elements/task/task.model';
import { Gateway } from './../../board/elements/gateway/gateway.model';
import { SequenceFlow } from './../../board/elements/sequence-flow/sequence-flow.model';

@Injectable({
  providedIn: 'root'
})
export class MockService implements IDatabase {

  constructor() { }

  getEvents(): Observable<IFlowElement[]> {
    console.log('test');

    return of([
      new SequenceFlow({
        id: 'SequenceFlow_1b0wrod',
        sourceRef: 'StartEvent_1',
        targetRef: 'Task_1o7dp70',
        waypoints: [
          { x: 283.0, y: 295.0 },
          { x: 333.0, y: 295.0 },
        ],
      }),
      new StartEvent({
        id: 'StartEvent_1',
        incoming: null,
        outgoing: ['SequenceFlow_1b0wrod'],
        x: 247.0,
        y: 277.0,
        width: 36.0,
        height: 36.0,
      }),
      new Gateway({
        id: 'ExclusiveGateway_1fm7m1m',
        incoming: ['SequenceFlow_0m76es2'],
        outgoing: ['SequenceFlow_0enu52f', 'SequenceFlow_0ptyi06'],
        x: 483.0,
        y: 270.0,
        width: 50.0,
        height: 50.0,
      }),
      new Task({
        id: 'Task_1o7dp70',
        incoming: ['SequenceFlow_1b0wrod'],
        outgoing: ['SequenceFlow_0m76es2'],
        x: 333.0,
        y: 255.0,
        width: 100.0,
        height: 80.0,
      }),
      new EndEvent({
        id: 'EndEvent_1c03rye',
        incoming: ['SequenceFlow_0ptyi06'],
        outgoing: null,
        x: 583.0,
        y: 387.0,
        width: 36.0,
        height: 36.0,
      }),
      new SequenceFlow({
        id: 'SequenceFlow_0ptyi06',
        sourceRef: 'ExclusiveGateway_1fm7m1m',
        targetRef: 'EndEvent_1c03rye',
        waypoints: [
          { x: 508.0, y: 320.0 },
          { x: 508.0, y: 405.0 },
          { x: 583.0, y: 405.0 },
        ],
      }),
    ]);
  }
}
