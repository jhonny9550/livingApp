import { Pipe, PipeTransform } from '@angular/core';
import { ProductProvider } from "../providers/product.provider";

@Pipe({
  name: 'parseProductRef'
})

export class ParseProductRefPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    if (value) return this.productProvider.getProduct(value);  
  }

  constructor(
    private productProvider: ProductProvider
  ) { }

}