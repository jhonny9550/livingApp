import { Pipe, PipeTransform } from '@angular/core';
import { ProductProvider } from "../providers/product.provider";

@Pipe({
  name: 'parseProductRef'
})

export class ParseProductRefPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) return this.productProvider.getProductByRef(value);  
  }

  constructor(
    private productProvider: ProductProvider
  ) { }

}