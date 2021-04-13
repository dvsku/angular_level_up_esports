import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProductInfo } from '../models/ProductInfo';
import { ProductService } from '../services/product.service';

@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductInfo> {
    constructor(private productService: ProductService) {}

    resolve(route: ActivatedRouteSnapshot): Promise<ProductInfo> {
        const id = route.params['id'];
        return this.productService.getProduct(id).then(
            (product) => {
                return product;
            },
            () => {
                return undefined;
            }
        );
    }
}
