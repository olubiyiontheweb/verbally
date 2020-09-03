import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectFilter'
})
export class ObjectFilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let date = new Date(value).toLocaleDateString();
    console.log(date);
    return date;
  }

}
