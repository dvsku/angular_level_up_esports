import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { publishReplay, refCount } from 'rxjs/operators';
import { ProductCategory } from '../models/ProductCategory';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryService {
    private categoryUrl = environment.apiURL + `productCategory`;
    private categoryAdminUrl = environment.apiURL + `admin/productCategory`;

    private categories: ProductCategory[] = null;
    private categoriesSubject: BehaviorSubject<ProductCategory[]> = new BehaviorSubject<ProductCategory[]>(null);
    private categoriesObs: Observable<ProductCategory[]> = this.categoriesSubject.asObservable();

    constructor(private httpClient: HttpClient) {}

    getProductCategories(): Observable<ProductCategory[]> {
        if (this.categories === null) {
            this.fetchProductCategories().subscribe((categories) => {
                this.categories = categories;
                this.categoriesSubject.next(this.categories);
                this.categoriesObs.pipe(publishReplay(1), refCount());
                console.log('Fetched categories from server.');
            });
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
            if (this.categories !== null && this.categories !== undefined) {
                category = this.categories.find((x) => x.categoryId === productCategoryId);
                if (category === undefined) {
                    // SHOULD BE AWAITED BUT CATEGORIES ARE ALWAYS GONNA BE FETCHED BEFORE A SINGLE CATEGORY
                    // IS NEEDED
                    this.fetchProductCategory(productCategoryId).subscribe((cat) => {
                        category = cat;
                    });
                }
            }
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

    editExistingProductCategory(id: number, productCategory: ProductCategory): Observable<boolean> {
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
