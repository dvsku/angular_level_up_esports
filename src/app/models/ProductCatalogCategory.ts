export class ProductCatalogCategory{
  categoryId ?: number;
  categoryName ?: string;
  categoryType ?: number;

  constructor(categoryName ?: string){
    this.categoryName = categoryName;
  }
}
