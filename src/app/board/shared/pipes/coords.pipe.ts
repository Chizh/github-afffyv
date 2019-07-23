import { Pipe, PipeTransform } from '@angular/core';

import { ICoords } from '../models/coords.model';

@Pipe({
  name: 'coords'
})
export class CoordsPipe implements PipeTransform {

  transform(value: ICoords): string {
    return `${value.x},${value.y}`;
  }

}
