import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})

export class ParseRolePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    switch (value) {
      case 'waiter': {
        return 'Mesero';
      }
      case 'cashier': {
        return 'Cajero';
      }
      case 'barman': {
        return 'Barman';
      }  
      default:
        return 'Default';
    }
  }
}