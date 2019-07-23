import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  OnChanges,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  SimpleChanges,
  ComponentFactory,
} from '@angular/core';

import { StartComponent } from '../elements/start/start.component';
import { EndComponent } from './../elements/end/end.component';
import { GatewayComponent } from './../elements/gateway/gateway.component';
import { TaskComponent } from '../elements/task/task.component';
import { SequenceFlowComponent } from '../elements/sequence-flow/sequence-flow.component';

import { IProcessComponent } from '../shared/models/process-component.model';
import { IFlowElement } from './../shared/models/flow-element.model';

@Component({
  selector: 'svg:g[app-event-element]',
  template: `<ng-template #dynamicContainer></ng-template>`,

  entryComponents: [StartComponent, GatewayComponent, TaskComponent, EndComponent, SequenceFlowComponent],
})
export class EventElementComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true }) dynamicContainer: ViewContainerRef;

  @Input() flowElement: IFlowElement;

  private componentRef: ComponentRef<IProcessComponent>;
  private componentInstance: IProcessComponent;
  private readonly flowToComponent = {
    StartEvent: StartComponent,
    EndEvent: EndComponent,
    Task: TaskComponent,
    Gateway: GatewayComponent,
    SequenceFlow: SequenceFlowComponent,
  };

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.createComponent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.flowElement) {
      this.createComponent();
    }
  }

  ngOnDestroy() {
    if (this.componentInstance) {
      this.componentInstance = null;
    }
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private createComponent() {
    this.dynamicContainer.clear();

    const component: { new(): IProcessComponent } =
      this.flowToComponent[this.flowElement.constructor.name];

    if (component) {
      const factory: ComponentFactory<IProcessComponent> = this.resolver.resolveComponentFactory(component);
      this.componentRef = this.dynamicContainer.createComponent(factory);
      this.componentInstance = this.componentRef.instance;

      // Передаем данные в компонент
      this.componentInstance.context = this.flowElement;
    }
  }
}
