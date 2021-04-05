import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCatalog } from '../models/ProductCatalog';

@Injectable({
    providedIn: 'root'
})
export class ProductCatalogService {
    private url = `http://localhost:8080/api/productCatalog`;
    private adminUrl = `http://localhost:8080/api/admin/productCatalog`;

    constructor(private httpClient: HttpClient) {}

    public getAllProductCatalog(): Observable<ProductCatalog[]> {
        const url = `${this.url}/list`;
        return this.httpClient.get<ProductCatalog[]>(url);
    }

    public getOneProductCatalog(id: number): Observable<ProductCatalog> {
        const url = `${this.url}/${id}`;
        return this.httpClient.get<ProductCatalog>(url);
    }

    public getAllProductCatalogInCategory(
        categoryType: number
    ): Observable<ProductCatalog[]> {
        const url = `${this.url}/category/${categoryType}`;
        return this.httpClient.get<ProductCatalog[]>(url);
    }

    public addNewProductCatalog(
        productCatalog: ProductCatalog
    ): Observable<ProductCatalog> {
        const url = `${this.adminUrl}/new`;
        return this.httpClient.post<ProductCatalog>(url, productCatalog);
    }

    public editExistingProductCatalog(
        id: number,
        productCatalog: ProductCatalog
    ): Observable<ProductCatalog> {
        const url = `${this.adminUrl}/${id}/edit`;
        return this.httpClient.put<ProductCatalog>(url, productCatalog);
    }

    public deleteExistingProductCatalog(id: number): Observable<any> {
        const url = `${this.adminUrl}/${id}`;
        return this.httpClient.delete<any>(url);
    }
}
