import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'parseDate'
})

export class ParseDatePipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    const format = args[0];
    return moment(value).format(format);
  }
}