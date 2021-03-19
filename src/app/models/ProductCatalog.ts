import { ProductIcon } from "./ProductIcon";

export class ProductCatalog{
  id ?: number;
  name : string;
  price : number;
  productDescription : string;
  categoryType : number; // 0 -> PICA , 1 -> NARGILE , 2 -> DRUSTVENE IGRE , dodati jos ako bude trebalo
  productIcons : ProductIcon[];

  constructor(name : string , price : number , productDescription : string , categoryType : number , productIcons : ProductIcon[]){
    this.name = name;
    this.price = price;
    this.productDescription = productDescription;
    if(categoryType === null || categoryType === undefined){
      this.categoryType = 2;
    }else{
      this.categoryType = categoryType;
    }
    this.productIcons = productIcons;
  }
}
