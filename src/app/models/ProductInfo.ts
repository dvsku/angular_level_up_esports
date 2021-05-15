import { ProductIcon } from './ProductIcon';
import { ProductInOrder } from './ProductInOrder';
import { ProductInfoSize } from './ProductInfoSize';

export class ProductInfo {
    productId?: number;
    productName: string;
    productPrice: number;
    priceInEuros: number;
    productDescription: string;
    productInfoIcons: ProductIcon[];
    productStatus: number;
    categoryType: number; // 0 - > TOPS , 1 -> BOTTOMS , 3 -> GEAR , dodati jos kategorija ako bude trebalo
    createTime: string;
    updateTime: string;
    productInfoSizes: ProductInfoSize[];
    sold: number;

    constructor(productInOrder?: ProductInOrder) {
        if (productInOrder) {
            this.productId = productInOrder.productId;
            this.productName = productInOrder.productName;
            this.productPrice = productInOrder.productPrice;
            this.productDescription = productInOrder.productDescription;
            this.productStatus = 0;
            this.categoryType = productInOrder.categoryType;
            this.productInfoSizes = [];
        } else {
            this.productId = null;
            this.productName = '';
            this.productPrice = 1000;
            this.priceInEuros = 0;
            this.productDescription = '';
            this.productInfoIcons = [];
            this.categoryType = 0;
            this.productStatus = 0;
            this.productInfoSizes = [];
        }
    }
}
