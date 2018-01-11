import { Pipe, PipeTransform } from '@angular/core';
import { OrderProvider } from "../providers/order.provider";
import { } from 'angularfire2/firestore';

@Pipe({
  name: 'orderRef'
})

export class OrderRefPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value) return this.orderProvider.getOrderByRef(value);
  }

  constructor(
    private orderProvider: OrderProvider
  ) { }

}