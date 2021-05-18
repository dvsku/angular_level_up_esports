export class ProductInOrderDto {
    productId: number;
    productSize: string;
    count: number;

    constructor(productId?: number, productSize?: string, count?: number) {
        this.productId = productId;
        this.productSize = productSize;
        this.count = count;
    }
}
