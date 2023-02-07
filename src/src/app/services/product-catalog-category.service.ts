import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCatalogCategory } from '../models/ProductCatalogCategory';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductCatalogCategoryService {
    private catalogCategoryUrl = environment.apiURL + `productCatalogCategory`;
    private catalogCategoryAdminurl = environment.apiURL + `admin/productCatalogCategory`;

    constructor(private httpClient: HttpClient) {}

    getOneProductCatalogCategory(id: number): Promise<ProductCatalogCategory> {
        return Promise.resolve(new ProductCatalogCategory());
    }

    getAllProductCatalogCategories(): Promise<ProductCatalogCategory[]> {
        return Promise.resolve([new ProductCatalogCategory()]);
    }

    addNewProductCatalogCategory(productCatalogCategory: ProductCatalogCategory): Promise<boolean> {
        return Promise.resolve(true);
    }

    editExistingProductCatalogCategory(id: number, productCatalogCategory: ProductCatalogCategory): Promise<boolean> {
        return Promise.resolve(true);
    }

    deleteExistingProductCatalogCategory(id: number): Promise<any> {
        return Promise.resolve(true);
    }
}
