import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProductInOrder } from '../models/ProductInOrder';
import { CartNotifyService } from './cart-notify.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartUrl = `http://localhost:8080/api/cart`;
    cartProducts: ProductInOrder[];

    constructor(
        private httpClient: HttpClient,
        private toastrService: ToastrService,
        private cookieService: CookieService,
        private cartNotifyService: CartNotifyService
    ) {}

    getCart(): ProductInOrder[] {
        if (this.cookieService.check('cart')) {
            this.cartProducts = JSON.parse(this.cookieService.get('cart'));
        } else {
            this.cartProducts = [];
        }
        return this.cartProducts;
    }

    addProductToCart(product: ProductInOrder): void {
        if (this.cookieService.check('cart')) {
            this.cartProducts = JSON.parse(this.cookieService.get('cart'));
        }
        const index = this.cartProducts.findIndex(
            (x) =>
                x.productId === product.productId && x.productSize === product.productSize
        );
        if (index !== -1) {
            this.cartProducts[index].count += product.count;
        } else {
            this.cartProducts.push(product);
        }
        this.cookieService.set('cart', JSON.stringify(this.cartProducts));
        this.toastrService.success('Successfully added item to cart.');
        this.cartNotifyService.notify(null);
    }

    removeProductFromCart(product: ProductInOrder): void {
        if (this.cookieService.check('cart')) {
            this.cartProducts = JSON.parse(this.cookieService.get('cart'));
        }
        const index = this.cartProducts.findIndex(
            (x) =>
                x.productId === product.productId && x.productSize === product.productSize
        );
        if (index !== -1) {
            this.cartProducts.splice(index, 1);
            this.cookieService.set('cart', JSON.stringify(this.cartProducts));
            this.toastrService.info('Item removed from cart');
            this.cartNotifyService.notify(null);
        } else {
            console.log('Failed to remove item from cart.');
        }
    }

    clearCart(): void {
        this.cookieService.delete('cart');
        this.cartProducts = [];
        this.cartNotifyService.notify(null);
    }

    checkout(): Observable<any> {
        const url = `${this.cartUrl}/checkout`;
        return this.httpClient.post(url, null).pipe();
    }
}
