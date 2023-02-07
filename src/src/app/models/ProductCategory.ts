export class ProductCategory {
    categoryId?: number;
    categoryName?: string;
    categoryType?: number;
    categoryOrder?: number;

    public constructor(init?: Partial<ProductCategory>) {
        Object.assign(this, init);
    }
}
