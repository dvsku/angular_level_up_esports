import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductCatalog } from '../models/ProductCatalog';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductCatalogService {
    private url = environment.apiURL + `productCatalog`;
    private adminUrl = environment.apiURL + `admin/productCatalog`;

    constructor(private httpClient: HttpClient) {}

    public getAllProductCatalog(): Observable<ProductCatalog[]> {
        const url = `${this.url}/list`;
        return this.httpClient.get<ProductCatalog[]>(url);
    }

    public getOneProductCatalog(id: number): Observable<ProductCatalog> {
        const url = `${this.url}/${id}`;
        return this.httpClient.get<ProductCatalog>(url);
    }

    public getAllProductCatalogInCategory(categoryType: number): Observable<ProductCatalog[]> {
        const url = `${this.url}/category/${categoryType}`;
        return this.httpClient.get<ProductCatalog[]>(url);
    }

    public addNewProductCatalog(productCatalog: ProductCatalog): Observable<boolean> {
        const url = `${this.adminUrl}/new`;
        return this.httpClient.post<boolean>(url, productCatalog).pipe(
            tap((data) => {
                console.log('Added new product catalog -> ' + data);
            })
        );
    }

    public editExistingProductCatalog(id: number, productCatalog: ProductCatalog): Observable<boolean> {
        const url = `${this.adminUrl}/${id}/edit`;
        return this.httpClient.put<boolean>(url, productCatalog).pipe(
            tap((data) => {
                console.log('Edited existing product catalog -> ' + data);
            })
        );
    }

    public deleteExistingProductCatalog(id: number): Observable<any> {
        const url = `${this.adminUrl}/${id}`;
        return this.httpClient.delete<any>(url);
    }
}
