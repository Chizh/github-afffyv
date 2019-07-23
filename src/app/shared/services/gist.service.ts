import { SequenceFlow } from './../../board/elements/sequence-flow/sequence-flow.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDatabase } from '../../board/shared/models/database.model';
import { IFlowElement } from '../../board/shared/models/flow-element.model';

import { StartEvent } from './../../board/elements/start/start-event.model';
import { EndEvent } from './../../board/elements/end/end-event.model';
import { Gateway } from './../../board/elements/gateway/gateway.model';
import { Task } from './../../board/elements/task/task.model';

interface JSONElement {
  $type: string;
  id: string;

  incoming?: string[];
  outgoing?: string[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  sourceRef?: string;
  targetRef?: string;
  waypoints?: {x: number, y: number}[];
}

@Injectable({
  providedIn: 'root'
})
export class GistService implements IDatabase {
  readonly url =
    'https://gist.githubusercontent.com/alexdarc/092a156b00ed5d5df16a46c4ddc59594/raw/194f732477e0a51a1c58a2e3e7a04810eb83a698/rr-process.json';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<IFlowElement[]> {
    return this.http.get<JSONElement[]>(this.url)
      .pipe(
        map(this.makeFlowElements.bind(this))
      );
  }

  makeFlowElements(jsonElements: JSONElement[]): IFlowElement[] {
    const result = jsonElements.map((jsonElement) => {
      switch (jsonElement.$type) {
        case 'tStartEvent':
          return new StartEvent({
            id: jsonElement.id,
            incoming: jsonElement.incoming,
            outgoing: jsonElement.outgoing,
            x: jsonElement.x,
            y: jsonElement.y,
            width: jsonElement.width,
            height: jsonElement.height,
          });
        case 'tEndEvent':
          return new EndEvent({
            id: jsonElement.id,
            incoming: jsonElement.incoming,
            outgoing: jsonElement.outgoing,
            x: jsonElement.x,
            y: jsonElement.y,
            width: jsonElement.width,
            height: jsonElement.height,
          });
        case 'tExclusiveGateway':
          return new Gateway({
            id: jsonElement.id,
            incoming: jsonElement.incoming,
            outgoing: jsonElement.outgoing,
            x: jsonElement.x,
            y: jsonElement.y,
            width: jsonElement.width,
            height: jsonElement.height,
          });
        case 'tTask':
          return new Task({
            id: jsonElement.id,
            incoming: jsonElement.incoming,
            outgoing: jsonElement.outgoing,
            x: jsonElement.x,
            y: jsonElement.y,
            width: jsonElement.width,
            height: jsonElement.height,
          });
        case 'tSequenceFlow':
          return new SequenceFlow({
            id: jsonElement.id,
            sourceRef: jsonElement.sourceRef,
            targetRef: jsonElement.targetRef,
            waypoints: jsonElement.waypoints,
          });

        default:
          throw new Error('JSON element cannot recognized');
      }
    });

    return result;
  }
}
