import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iterable'
})
export class IterablePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let out=[];
    if(typeof value =="object"){
      out = Object.keys(value);
    }
    return out;
  }

}
