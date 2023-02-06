export class ProductCatalogCategory {
    categoryId?: number;
    categoryName?: string;
    categoryType?: number;
    categoryOrder?: number;

    constructor(categoryName?: string, categoryOrder?: number) {
        this.categoryOrder = categoryOrder;
        this.categoryName = categoryName;
    }
}
