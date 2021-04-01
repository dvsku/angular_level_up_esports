import { ProductSize } from "../enums/ProductSize";

export class ProductInfoSize{
  id? : number;
  productSize : ProductSize;

  constructor(id?: number , productSize ?: ProductSize){
    productSize = productSize;
  }
}
