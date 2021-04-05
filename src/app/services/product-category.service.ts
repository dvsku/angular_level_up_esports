import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { publishReplay, refCount } from 'rxjs/operators';
import { ProductCategory } from '../models/ProductCategory';

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryService {
    private categoriesSubject: BehaviorSubject<ProductCategory[]> = new BehaviorSubject<
        ProductCategory[]
    >(null);
    private categoriesObs: Observable<
        ProductCategory[]
    > = this.categoriesSubject.asObservable();

    private categoryUrl = `http://localhost:8080/api/productCategory`;
    private categoryAdminUrl = `http://localhost:8080/api/admin/productCategory`;

    constructor(private httpClient: HttpClient) {}

    getProductCategories(): Observable<ProductCategory[]> {
        if (this.categoriesSubject.getValue() === null) {
            const categoriesObs = this.fetchProductCategories();
            let categories: ProductCategory[];

            categoriesObs.subscribe((data) => {
                categories = data;
            });

            this.categoriesSubject.next(categories);
            this.categoriesObs = categoriesObs.pipe(publishReplay(1), refCount());
        }
        return this.categoriesObs;
    }

    private fetchProductCategories(): Observable<ProductCategory[]> {
        const url = `${this.categoryUrl}/list`;
        return this.httpClient.get<ProductCategory[]>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    getProductCategory(productCategoryId: number): ProductCategory {
        let category = undefined;
        if (this.categoriesObs) {
            this.categoriesObs.subscribe((data) => {
                if (data !== null && data !== undefined) {
                    category = data.find((x) => x.categoryId === productCategoryId);
                }
                if (category === null || category === undefined) {
                    this.fetchProductCategory(productCategoryId).subscribe((cat) => {
                        category = cat;
                    });
                }
            });
        }
        return category;
    }

    private fetchProductCategory(productCategoryId: number): Observable<ProductCategory> {
        const url = `${this.categoryUrl}/${productCategoryId}`;
        return this.httpClient.get<ProductCategory>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    addNewProductCategory(productCategory: ProductCategory): Observable<boolean> {
        const url = `${this.categoryAdminUrl}/new`;
        return this.httpClient.post<boolean>(url, productCategory).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    editExistingProductCategory(
        id: number,
        productCategory: ProductCategory
    ): Observable<boolean> {
        const url = `${this.categoryAdminUrl}/${id}/edit`;
        return this.httpClient.put<boolean>(url, productCategory).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    deleteExistingProductCategory(id: number): Observable<any> {
        const url = `${this.categoryAdminUrl}/${id}`;
        return this.httpClient.delete<any>(url).pipe(
            tap((data) => {
                console.log(data);
            })
        );
    }
}
