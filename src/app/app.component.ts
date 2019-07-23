import { Component, HostListener } from '@angular/core';

import { MockService } from './shared/services/mock.service';
import { GistService } from './shared/services/gist.service';

import { UndoRedoStateManager } from './UndoRedoStateManager/UndoRedoStateManager';
import { IApplicationCommand } from './ApplicationCommands/IApplicationCommand';
import { FlowElementsStorage } from './FlowElementEventsStorage/FlowElementsStorage';

import { ApplicationCommandVisitor } 
  from './ApplicationCommands/ApplicationCommandVisitors/ApplicationCommandVisitor';
import { ApplicationCommandApplyingVisitor } 
  from './ApplicationCommands/ApplicationCommandVisitors/ApplicationCommandApplyingVisitor';
import { ApplicationCommandUndoVisitor }
  from './ApplicationCommands/ApplicationCommandVisitors/ApplicationCommandUndoVisitor';


const KEY_Y = 89;
const KEY_Z = 90;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  undoRedoStateManager: UndoRedoStateManager<IApplicationCommand, ApplicationCommandVisitor>;
  flowElementStorage: FlowElementsStorage;

  constructor(
    public mockService: MockService,
    public gistService: GistService,
  ) {
    this.flowElementStorage = new FlowElementsStorage(gistService);

    this.undoRedoStateManager
      = new UndoRedoStateManager<IApplicationCommand, ApplicationCommandVisitor>(
        new ApplicationCommandApplyingVisitor(this.flowElementStorage),
        new ApplicationCommandUndoVisitor(this.flowElementStorage)
      );
  }

  OnBoardEvent(command: IApplicationCommand) {
    this.undoRedoStateManager
      .Apply(command);
  }

  onUndo() {
    this.undoRedoStateManager
      .Undo();
  }

  onRedo() {
    this.undoRedoStateManager
      .Redo();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode === KEY_Y) {
      this.onRedo();
    }

    // tslint:disable-next-line: deprecation
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode === KEY_Z) {
      this.onUndo();
    }
  }
}
