import { Component, OnInit } from '@angular/core';

import { IProcessComponent } from '../../shared/models/process-component.model';
import { Task } from './task.model';

@Component({
  selector: 'svg:svg[app-task]',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements IProcessComponent, OnInit {
  context: Task;

  constructor() { }

  ngOnInit() {
  }

}
