export class ProductCategory {
    categoryId?: number;
    categoryName?: string;
    categoryType?: number;

    constructor(categoryName?: string) {
        this.categoryName = categoryName;
    }
}
