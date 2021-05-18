import { ProductInfo } from './ProductInfo';

export class ProductInOrder {
    id: number;
    count: number;
    productSize: string;
    product: ProductInfo;

    constructor(id?: number, product?: ProductInfo, count = 1, productSize = '') {
        this.id = id;
        this.count = count;
        this.productSize = productSize;
        this.product = product;
    }
}
