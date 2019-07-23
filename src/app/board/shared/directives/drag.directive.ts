import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  Output,
  EventEmitter,
  Input,
  AfterViewInit,
} from '@angular/core';
import { DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { Point } from '@angular/cdk/drag-drop/typings/drag-ref';

import { Subscription } from 'rxjs';

export interface DragData<T> {
  data: T;
  coords: Point;
}

@Directive({
  selector: '[appDrag]'
})
export class DragDirective<T = any> implements AfterViewInit, OnDestroy {
  dragRef: DragRef;
  startedSub: Subscription;
  releasedSub: Subscription;
  movedSub: Subscription;
  clone: Node;
  parentElement: HTMLElement;
  distance: Point;

  private readonly classnames = {
    clone: 'app-drag-clone',
    moving: 'app-drag-moving',
  };

  @Input() appDragData: T;
  @Output() appDragReleased: EventEmitter<DragData<T>> = new EventEmitter<DragData<T>>();

  constructor(
    private el: ElementRef,
    private dragDropService: DragDrop,
    private renderer: Renderer2,
  ) {}

  private removeClone() {
    if (this.clone) {
      this.renderer.removeChild(
        this.renderer.parentNode(this.clone),
        this.clone,
      );
      this.clone = null;
    }
  }

  private createClone() {
    const nativeElement: HTMLElement = this.el.nativeElement;
    this.parentElement = this.renderer.parentNode(nativeElement);
    this.clone = nativeElement.cloneNode(true);

    this.renderer.addClass(this.clone, this.classnames.clone);
    this.renderer.insertBefore(
      this.parentElement,
      this.clone,
      this.el.nativeElement,
    );
  }

  private makeDrag() {
    this.dragRef = this.dragDropService.createDrag(this.el);
    this.dragRef.withBoundaryElement(this.parentElement);

    this.startedSub = this.dragRef.started.subscribe(() => {
      this.createClone();

      this.renderer.addClass(
        this.el.nativeElement,
        this.classnames.moving,
      );
    });

    this.movedSub = this.dragRef.moved.subscribe((value) => {
      this.distance = value.distance;
    });

    this.releasedSub = this.dragRef.released.subscribe(() => {
      this.appDragReleased.emit({
        data: this.appDragData,
        coords: this.distance,
      });

      this.renderer.removeClass(
        this.el.nativeElement,
        this.classnames.moving,
      );

      this.resetDrag();
    });
  }

  private resetDrag() {
    this.distance = null;
    this.removeClone();

    this.dragRef.reset();
    /*
      NOTE: Библиотека drag-n-drop работает как-то не так
      reset очищает стили transform, но не удаляет аттрибут transform.
      Возможно это из-за того что svg, но почему тогда этот аттрибут добавляется?
    */
    this.renderer.removeAttribute(
      this.el.nativeElement,
      'transform',
    );
  }

  ngAfterViewInit() {
    this.makeDrag();
  }

  ngOnDestroy() {
    if (this.startedSub) {
      this.startedSub.unsubscribe();
    }

    if (this.movedSub) {
      this.movedSub.unsubscribe();
    }

    if (this.releasedSub) {
      this.releasedSub.unsubscribe();
    }

    this.removeClone();
  }
}
