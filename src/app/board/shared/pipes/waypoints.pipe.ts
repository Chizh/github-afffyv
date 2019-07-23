import { Pipe, PipeTransform } from '@angular/core';
import { ICoords } from './../models/coords.model';

@Pipe({
  name: 'waypoints'
})
export class WaypointsPipe implements PipeTransform {

  transform(waypoints: ICoords[]): string {
    return waypoints
      .map((coords) => `${coords.x},${coords.y}`)
      .join('L');
  }

}
