import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseOrderStatus'
})

export class ParseOrderStatusPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    switch (value) {
      case 'dispatch_pendent': {
        return 'Pendiente en despacho';
      };
      case 'dispatch_ok': {
        return 'Listo en despacho';
      };
      case 'cashier_pendent': {
        return 'Pendiente en caja';
      };
      case 'delivered': {
        return 'Entregado';
      };
      case 'canceled': {
        return 'Cancelada';
      };
      default: {
        return 'Default option';
      };
    }
  }
}