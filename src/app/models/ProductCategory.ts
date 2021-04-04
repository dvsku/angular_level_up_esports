export class ProductCategory{
  categoryId ?: number;
  categoryName ?: string;
  categoryType ?: number;
  categoryOrder ?: number;

  constructor(categoryName ?: string){
    this.categoryName = categoryName;
  }
}
