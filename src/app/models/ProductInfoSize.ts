import { ProductSize } from "../enums/ProductSize";

export class ProductInfoSize{
  id? : number;
  productSize ?: ProductSize;
  sizeOrder ?: number;

  constructor(id?: number , productSize ?: ProductSize){
    productSize = productSize;
  }
}
