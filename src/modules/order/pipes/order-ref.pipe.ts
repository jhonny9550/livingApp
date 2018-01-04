import { Pipe, PipeTransform } from '@angular/core';
import { OrderProvider } from "../providers/order.provider";

@Pipe({
  name: 'orderRef'
})

export class OrderRefPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    return this.orderProvider.getOrderById(value);
  }

  constructor(
    private orderProvider: OrderProvider
  ) { }

}