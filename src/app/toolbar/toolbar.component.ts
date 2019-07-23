import { CreateStartEventCommand } from './../ApplicationCommands/CreateStartEventCommand';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { IApplicationCommand } from '../ApplicationCommands/IApplicationCommand';
import { CreateTaskCommand } from '../ApplicationCommands/CreateTaskCommand';
import { CreateEndEventCommand } from '../ApplicationCommands/CreateEndEventCommand';
import { CreateGatewayCommand } from '../ApplicationCommands/CreateGatewayCommand';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() addElement: EventEmitter<IApplicationCommand> =
    new EventEmitter<IApplicationCommand>();

  @Output() undo: EventEmitter<any> = new EventEmitter();
  @Output() redo: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addTask() {
    this.addElement.emit(
      new CreateTaskCommand(
        'task_2' + Math.random(),
        Math.round(200 + Math.random() * 100),
        Math.round(300 + Math.random() * 100)
      )
    );
  }

  addStartEvent() {
    this.addElement.emit(
      new CreateStartEventCommand(
        'StartEvent_' + Math.random(),
        Math.round(200 + Math.random() * 100),
        Math.round(300 + Math.random() * 100)
      )
    );
  }

  addEndEvent() {
    this.addElement.emit(
      new CreateEndEventCommand(
        'EndEvent_' + Math.random(),
        Math.round(200 + Math.random() * 100),
        Math.round(300 + Math.random() * 100)
      )
    );
  }

  addGateway() {
    this.addElement.emit(
      new CreateGatewayCommand(
        'Gateway_2' + Math.random(),
        Math.round(200 + Math.random() * 100),
        Math.round(300 + Math.random() * 100)
      )
    );
  }
}
