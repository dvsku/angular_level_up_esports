import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductCatalogCategory } from '../models/ProductCatalogCategory';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductCatalogCategoryService {
    private catalogCategoryUrl = environment.apiURL + `productCatalogCategory`;
    private catalogCategoryAdminurl = environment.apiURL + `admin/productCatalogCategory`;

    constructor(private httpClient: HttpClient) {}

    getOneProductCatalogCategory(id: number): Observable<ProductCatalogCategory> {
        const url = `${this.catalogCategoryUrl}/${id}`;
        return this.httpClient.get<ProductCatalogCategory>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    getAllProductCatalogCategories(): Observable<ProductCatalogCategory[]> {
        const url = `${this.catalogCategoryUrl}/list`;
        return this.httpClient.get<ProductCatalogCategory[]>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    addNewProductCatalogCategory(productCatalogCategory: ProductCatalogCategory): Observable<boolean> {
        const url = `${this.catalogCategoryAdminurl}/new`;
        return this.httpClient.post<boolean>(url, productCatalogCategory).pipe(
            tap((data) => {
                console.log('Added new product catalog category -> ' + data);
            })
        );
    }

    editExistingProductCatalogCategory(
        id: number,
        productCatalogCategory: ProductCatalogCategory
    ): Observable<boolean> {
        const url = `${this.catalogCategoryAdminurl}/${id}/edit`;
        return this.httpClient.put<boolean>(url, productCatalogCategory).pipe(
            tap((data) => {
                console.log('Edited existing product catalog category -> ' + data);
            })
        );
    }

    deleteExistingProductCatalogCategory(id: number): Observable<any> {
        const url = `${this.catalogCategoryAdminurl}/${id}`;
        return this.httpClient.delete<any>(url).pipe(
            tap((data) => {
                console.log(data);
            })
        );
    }
}
