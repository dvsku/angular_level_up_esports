import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductInfo } from '../models/ProductInfo';
import { environment } from '../../environments/environment';
import { ProductIcon } from '../models/ProductIcon';
import { ProductInfoSize } from '../models/ProductInfoSize';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = environment.apiURL + `product`;
    private categoryUrl = environment.apiURL + `category`;
    private productAdminUrl = environment.apiURL + `admin/product`;

    private products: ProductInfo[] = [
        new ProductInfo({
            productId: 1,
            productName: 'Level Up Hoodie',
            productPrice: 1000,
            priceInEuros: 10,
            productDescription: 'High quality hoodie made from 100% cotton with Level Up esports branding.',
            productStatus: 0,
            categoryType: 0,
            sold: 1,
            productInfoSizes: [new ProductInfoSize(1, 'S'), new ProductInfoSize(2, 'M'), new ProductInfoSize(3, 'L')],
            productInfoIcons: [
                new ProductIcon(1, 'products/hoodie_2_front.jpg', 0),
                new ProductIcon(2, 'products/hoodie_2_back.jpg', 1)
            ]
        }),
        new ProductInfo({
            productId: 2,
            productName: 'Level Up Jersey',
            productPrice: 1000,
            priceInEuros: 10,
            productDescription: 'High quality jersey made from polyester with Level Up esports branding.',
            productStatus: 0,
            categoryType: 0,
            sold: 1,
            productInfoSizes: [new ProductInfoSize(1, 'S'), new ProductInfoSize(2, 'M'), new ProductInfoSize(3, 'L')],
            productInfoIcons: [
                new ProductIcon(1, 'products/jersey_1_front.jpg', 0),
                new ProductIcon(2, 'products/jersey_1_back.jpg', 1)
            ]
        }),
        new ProductInfo({
            productId: 3,
            productName: 'Level Up T-shirt',
            productPrice: 1000,
            priceInEuros: 10,
            productDescription: 'High quality T-shirt made from 100% cotton with Level Up esports branding.',
            productStatus: 0,
            categoryType: 0,
            sold: 1,
            productInfoSizes: [new ProductInfoSize(1, 'S'), new ProductInfoSize(2, 'M'), new ProductInfoSize(3, 'L')],
            productInfoIcons: [
                new ProductIcon(1, 'products/tshirt_1_front.jpg', 0),
                new ProductIcon(2, 'products/tshirt_1_back.jpg', 1)
            ]
        })
    ];
    private productsSubject: BehaviorSubject<ProductInfo[]> = new BehaviorSubject<ProductInfo[]>(this.products);
    private productsObs = this.productsSubject.asObservable();

    constructor(private httpClient: HttpClient) {}

    getProducts(): Observable<ProductInfo[]> {
        return this.productsObs;
    }

    getProduct(productId: number): Promise<ProductInfo> {
        let product = undefined;
        if (this.products !== null && this.products !== undefined) {
            product = this.products.find((x) => x.productId === +productId);
        }
        if (product === undefined) {
            return Promise.reject();
        } else {
            product.productInfoSizes = product.productInfoSizes.sort((a, b) => a.sizeOrder - b.sizeOrder);
            product.productInfoIcons = product.productInfoIcons.sort((a, b) => a.displayOrder - b.displayOrder);
            return Promise.resolve(product);
        }
    }

    removeProduct(product: ProductInfo): void {}

    createProduct(product: ProductInfo): Promise<boolean> {
        return Promise.resolve(true);
    }

    updateProduct(product: ProductInfo): Promise<boolean> {
        return Promise.resolve(true);
    }
}
