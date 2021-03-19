import { ProductSize } from "../enums/ProductSize";
import { ProductInfo } from "./ProductInfo";

export class ProductInOrder{
    productId : number;
    productName : string;
    productDescription : string;
    productIcon : string;
    categoryType : number;
    productPrice : number;
    count : number;
    productSize : string;

    constructor(productInfo : ProductInfo , quantity : number = 1 , productSize : string = ""){
      this.productId = productInfo.productId;
      this.productName = productInfo.productName;
      this.productPrice = productInfo.productPrice;

      this.productDescription = productInfo.productDescription;;
      this.productIcon = productInfo.productInfoIcons[0].productIcon;
      this.categoryType = productInfo.categoryType;
      this.count = quantity;
      this.productSize = productSize;
    }
}
