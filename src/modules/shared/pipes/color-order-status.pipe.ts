import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorOrderStatus'
})

export class ColorOrderStatusPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    switch (value) {
      case 'dispatch_pendent': {
        return 'warning';
      };
      case 'dispatch_ok': {
        return 'primary';
      };
      case 'cashier_pendent': {
        return 'danger';
      };
      case 'delivered': {
        return 'secondary';
      }; 
      default: {
        return 'light';
      };
    }
  }
}