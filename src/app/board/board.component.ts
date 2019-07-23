import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

import { DragData } from './shared/directives/drag.directive';
import { IFlowElement } from './shared/models/flow-element.model';
import { IApplicationCommand } from '../ApplicationCommands/IApplicationCommand';
import { CreateTaskCommand } from '../ApplicationCommands/CreateTaskCommand';
import { MoveCommand } from '../ApplicationCommands/MoveCommand';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],

  encapsulation: ViewEncapsulation.ShadowDom,
})
export class BoardComponent {

  @Input()
  state: IFlowElement[];

  @Output()
  eventBus: EventEmitter<IApplicationCommand> = new EventEmitter<IApplicationCommand>();

  constructor() { }

  onAdd(evt: MouseEvent) {
    this.eventBus.emit(
      new CreateTaskCommand(
        'task_2' + Math.random(),
        evt.offsetX,
        evt.offsetY
      )
    );
  }

  onRelease(dragData: DragData<string>) {
    this.eventBus.emit(
      new MoveCommand(
        dragData.data,
        dragData.coords
      )
    );
  }
}
