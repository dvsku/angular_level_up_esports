import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { ProductInfo } from '../models/ProductInfo';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = environment.apiURL + `product`;
    private categoryUrl = environment.apiURL + `category`;
    private productAdminUrl = environment.apiURL + `admin/product`;

    private products: ProductInfo[] = null;
    private productsSubject: BehaviorSubject<ProductInfo[]> = new BehaviorSubject<ProductInfo[]>(this.products);
    private productsObs = this.productsSubject.asObservable();

    constructor(private httpClient: HttpClient) {}

    getProducts(): Observable<ProductInfo[]> {
        if (this.products === null) {
            this.fetchSortedProducts('new').subscribe((products) => {
                this.products = products;
                this.products.forEach((product) => {
                    product.productInfoSizes = product.productInfoSizes.sort((a, b) => a.sizeOrder - b.sizeOrder);
                    product.productInfoIcons = product.productInfoIcons.sort((a, b) => a.displayOrder - b.displayOrder);
                });
                this.productsSubject.next(this.products);
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

    getProduct(productId: number): Promise<ProductInfo> {
        let product = undefined;
        if (this.products !== null && this.products !== undefined) {
            product = this.products.find((x) => x.productId === +productId);
        }
        if (product === undefined) {
            return this.fetchProduct(productId)
                .then((prod) => {
                    prod.productInfoSizes = prod.productInfoSizes.sort((a, b) => a.sizeOrder - b.sizeOrder);
                    prod.productInfoIcons = prod.productInfoIcons.sort((a, b) => a.displayOrder - b.displayOrder);
                    return prod;
                })
                .catch(() => {
                    return undefined;
                });
        } else {
            product.productInfoSizes = product.productInfoSizes.sort((a, b) => a.sizeOrder - b.sizeOrder);
            product.productInfoIcons = product.productInfoIcons.sort((a, b) => a.displayOrder - b.displayOrder);
            return Promise.resolve(product);
        }
    }

    private fetchProduct(productId: number): Promise<ProductInfo> {
        const url = `${this.productUrl}/${productId}`;
        console.log('fetching from server');
        return this.httpClient
            .get<ProductInfo>(url)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    removeProduct(product: ProductInfo): void {
        this.removeDatabaseProduct(product).subscribe(() => {
            if (this.productsObs) {
                if (this.products !== null && this.products !== undefined) {
                    const index = this.products.findIndex((x) => x.productId === product.productId);
                    if (index !== -1) {
                        this.products.splice(index, 1);
                        this.productsSubject.next(this.products);
                    }
                }
            }
        });
    }

    private removeDatabaseProduct(productInfo: ProductInfo): Observable<any> {
        const url = `${this.productAdminUrl}/${productInfo.productId}/delete`;
        return this.httpClient.delete(url);
    }

    createProduct(product: ProductInfo): Promise<boolean> {
        return this.createDatabaseProduct(product).then(
            (response) => {
                if (this.productsObs) {
                    if (this.products !== null && this.products !== undefined) {
                        product.productId = response;
                        this.products.push(product);
                        this.productsSubject.next(this.products);
                    }
                }
                return true;
            },
            () => {
                return false;
            }
        );
    }

    private createDatabaseProduct(productInfo: ProductInfo): Promise<number> {
        const url = `${this.productAdminUrl}/new`;
        return this.httpClient
            .post<number>(url, productInfo)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    updateProduct(product: ProductInfo): Promise<boolean> {
        return this.updateDatabaseProduct(product).then(
            (success) => {
                if (success) {
                    if (this.productsObs) {
                        if (this.products !== null && this.products !== undefined) {
                            const index = this.products.findIndex((x) => x.productId === product.productId);
                            if (index !== -1) {
                                this.products[index] = product;
                                this.productsSubject.next(this.products);
                            }
                        }
                    }
                }
                return success;
            },
            (error) => {
                return false;
            }
        );
    }

    private updateDatabaseProduct(productInfo: ProductInfo): Promise<boolean> {
        const url = `${this.productAdminUrl}/${productInfo.productId}/edit`;
        return this.httpClient
            .put<boolean>(url, productInfo)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
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
    private getAllSortedProductsInCategory(categoryType: number, sortType: string): Observable<ProductInfo[]> {
        const url = `${this.productUrl}/sortBy/${categoryType}/${sortType}`;
        return this.httpClient.get<ProductInfo[]>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    private getProductsInCategory(categoryType: number, page: number, size: number): Observable<any> {
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
