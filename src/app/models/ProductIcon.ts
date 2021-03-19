export class ProductIcon{
  id ?: number;
  productIcon : string;
  iconOrder ?: number;

  constructor(productIcon : string , iconOrder?: number){
    this.productIcon = productIcon;
    this.iconOrder = iconOrder;
  }
}
