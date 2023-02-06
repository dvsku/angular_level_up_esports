import { ProductIcon } from './ProductIcon';
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

    constructor() {
        this.productId = null;
        this.productName = '';
        this.productPrice = 1000;
        this.priceInEuros = 10;
        this.productDescription = '';
        this.productInfoIcons = [];
        this.productStatus = 0;
        this.categoryType = 0;
        this.productInfoSizes = [];
        this.sold = 0;
    }
}
