import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectFilter'
})
export class ObjectFilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let keys = [];
    for (let key in value) {
      keys.push(value[key]);
    }
    return keys;
    //return null;
  }

}
