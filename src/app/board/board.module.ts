import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BoardComponent } from './board.component';
import { EventElementComponent } from './event-element/event-element.component';
import { StartComponent } from './elements/start/start.component';
import { GatewayComponent } from './elements/gateway/gateway.component';
import { TaskComponent } from './elements/task/task.component';
import { EndComponent } from './elements/end/end.component';
import { SequenceFlowComponent } from './elements/sequence-flow/sequence-flow.component';
import { CoordsPipe } from './shared/pipes/coords.pipe';
import { DragDirective } from './shared/directives/drag.directive';
import { WaypointsPipe } from './shared/pipes/waypoints.pipe';

@NgModule({
  declarations: [
    BoardComponent,
    EventElementComponent,
    StartComponent,
    GatewayComponent,
    TaskComponent,
    EndComponent,
    SequenceFlowComponent,
    CoordsPipe,
    DragDirective,
    WaypointsPipe
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [BoardComponent],
})
export class BoardModule { }
