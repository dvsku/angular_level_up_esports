import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { publishReplay, refCount, takeLast } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';
import { ProductInfo } from '../models/ProductInfo';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = `http://localhost:8080/api/product`;
    private categoryUrl = `http://localhost:8080/api/category`;
    private productAdminUrl = `http://localhost:8080/api/admin/product`;

    private productsSubject: BehaviorSubject<ProductInfo[]> = new BehaviorSubject<
        ProductInfo[]
    >(null);
    private productsObs = this.productsSubject.asObservable();

    constructor(private httpClient: HttpClient) {}

    getProducts(): Observable<ProductInfo[]> {
        if (this.productsSubject.getValue() === null) {
            let products: ProductInfo[];
            this.fetchSortedProducts('new').subscribe((prods) => {
                products = prods;

                this.productsSubject.next(products);
                this.productsObs.pipe(publishReplay(1), refCount());
                console.log('Fetched products from server.');
            });
        }
        return this.productsObs;
    }

    // "new" -> SORT BY NEW PRODUCTS
    // "highToLow" -> SORT BY HIGH PRICE TO LOW
    // "lowToHigh" -> SORT BY LOW PRICE TO HIGH
    // "sold" -> SORT BY MOST SOLD
    private fetchSortedProducts(sortType: string): Observable<ProductInfo[]> {
        const url = `${this.productUrl}/sortBy/${sortType}`;
        return this.httpClient.get<ProductInfo[]>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    getProduct(productId: number): ProductInfo {
        let product = undefined;
        if (this.productsObs) {
            this.productsObs.subscribe((prods) => {
                if (prods !== null && prods !== undefined) {
                    product = prods.find((x) => x.productId === productId);
                }
                if (product === undefined) {
                    this.fetchProduct(productId).subscribe((prod) => {
                        product = prod;
                        console.log('Fetched product from server.');
                    });
                }
            });
        }
        return product;
    }

    private fetchProduct(productId: number): Observable<ProductInfo> {
        const url = `${this.productUrl}/${productId}`;
        return this.httpClient.get<ProductInfo>(url).pipe(
            catchError(() => {
                return of(new ProductInfo());
            })
        );
    }

    removeProduct(product: ProductInfo): void {
        this.removeDatabaseProduct(product).subscribe(() => {
            let products: ProductInfo[];
            if (this.productsObs) {
                this.productsObs.pipe(takeLast(1)).subscribe((prods) => {
                    products = prods;
                    if (products !== null || products !== undefined) {
                        const index = products.findIndex(
                            (x) => x.productId === product.productId
                        );
                        if (index !== -1) {
                            products.splice(index, 1);
                            this.productsSubject.next(products);
                        }
                    }
                });
            }
        });
    }

    private removeDatabaseProduct(productInfo: ProductInfo): Observable<any> {
        const url = `${this.productAdminUrl}/${productInfo.productId}/delete`;
        return this.httpClient.delete(url);
    }

    createProduct(product: ProductInfo): Observable<boolean> {
        const success: Subject<boolean> = new Subject<boolean>();
        this.createDatabaseProduct(product).subscribe(
            () => {
                let products: ProductInfo[];
                if (this.productsObs) {
                    this.productsObs.pipe(takeLast(1)).subscribe((prods) => {
                        products = prods;
                        if (products !== null && products !== undefined) {
                            products.push(product);
                            this.productsSubject.next(products);
                        }
                    });
                }
                success.next(true);
            },
            (error) => {
                console.log("Couldn't create product: " + error.message);
                success.next(false);
            }
        );
        return success.asObservable();
    }

    private createDatabaseProduct(productInfo: ProductInfo): Observable<ProductInfo> {
        const url = `${this.productAdminUrl}/new`;
        return this.httpClient.post<ProductInfo>(url, productInfo).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    updateProduct(product: ProductInfo): Observable<boolean> {
        const success: Subject<boolean> = new Subject<boolean>();
        this.updateDatabaseProduct(product).subscribe(
            () => {
                let products: ProductInfo[];
                if (this.productsObs) {
                    this.productsObs.pipe(takeLast(1)).subscribe((prods) => {
                        products = prods;
                        if (products !== null && products !== undefined) {
                            const index = products.findIndex(
                                (x) => x.productId === product.productId
                            );
                            if (index !== -1) {
                                products[index] = product;
                                this.productsSubject.next(products);
                            }
                        }
                    });
                }
                success.next(true);
            },
            (error) => {
                success.next(false);
                console.log("Couldn't update product: " + error.message);
            }
        );
        return success.asObservable();
    }

    private updateDatabaseProduct(productInfo: ProductInfo): Observable<ProductInfo> {
        const url = `${this.productAdminUrl}/${productInfo.productId}/edit`;
        return this.httpClient.put<ProductInfo>(url, productInfo).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //	NOT USED
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private getAllUpProductsPage(page: number, size: number): Observable<ProductInfo[]> {
        const url = `${this.productUrl}?page=${page}&size=${size}`;
        return this.httpClient.get<ProductInfo[]>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    private getAllProductsPage(page: number, size: number): Observable<ProductInfo[]> {
        const url = `${this.productUrl}/all?page=${page}&size=${size}`;
        return this.httpClient.get<ProductInfo[]>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    // 0 -> TOPS
    // 1 -> BOTTOMS
    // 2 -> GEAR
    private getAllSortedProductsInCategory(
        categoryType: number,
        sortType: string
    ): Observable<ProductInfo[]> {
        const url = `${this.productUrl}/sortBy/${categoryType}/${sortType}`;
        return this.httpClient.get<ProductInfo[]>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    private getProductsInCategory(
        categoryType: number,
        page: number,
        size: number
    ): Observable<any> {
        const url = `${this.categoryUrl}/${categoryType}?page=${page}&size=${size}`;
        return this.httpClient.get(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    private handleError<T>(result?: T) {
        return (): Observable<T> => {
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
