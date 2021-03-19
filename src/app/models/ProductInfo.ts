import { logging } from "protractor";
import { ProductSize } from "../enums/ProductSize";
import { ProductIcon } from "./ProductIcon";
import { ProductInOrder } from "./ProductInOrder";
import { ProductInfoSize } from "./ProductInfoSize";

export class ProductInfo{
  productId ?: number;
  productName : string;
  productPrice : number;
  productDescription : string;
  productInfoIcons : ProductIcon[];
  productStatus : number;
  categoryType : number; // 0 - > TOPS , 1 -> BOTTOMS , 3 -> GEAR , dodati jos kategorija ako bude trebalo
  createTime: string;
  updateTime: string;
  productInfoSizes : ProductInfoSize[];
  sold : number;

  constructor(productInOrder? : ProductInOrder){
      if(productInOrder){
        this.productId = productInOrder.productId;
        this.productName = productInOrder.productName;
        this.productPrice = productInOrder.productPrice;
        this.productDescription = productInOrder.productDescription;
        this.categoryType = productInOrder.categoryType;
        this.productStatus = 0;
        this.productInfoSizes = [];
      }else{
            this.productId = null;
            this.productName = '';
            this.productPrice = 20;
            this.productDescription = '';
            this.productInfoIcons = [];
            this.categoryType = 0;
            this.productStatus = 0;
            this.productInfoSizes = [];
      }
  }
}
