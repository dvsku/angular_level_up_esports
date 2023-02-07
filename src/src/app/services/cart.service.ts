import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductInOrder } from '../models/ProductInOrder';
import { environment } from '../../environments/environment';
import { OrderDto } from '../models/dto/OrderDto';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartUrl = environment.apiURL + `cart`;

    private cartProducts: ProductInOrder[] = null;
    private cartProductsSubject: BehaviorSubject<ProductInOrder[]> = new BehaviorSubject<ProductInOrder[]>(
        this.cartProducts
    );
    private cartProductsObs: Observable<ProductInOrder[]> = this.cartProductsSubject.asObservable();

    constructor(
        private httpClient: HttpClient,
        private toastrService: ToastrService,
        private cookieService: CookieService
    ) {}

    getCart(): Observable<ProductInOrder[]> {
        if (this.cartProducts === null) {
            if (this.cookieService.check('cart')) {
                this.cartProducts = JSON.parse(this.cookieService.get('cart'));
            } else {
                this.cartProducts = [];
            }
        }
        this.cartProductsSubject.next(this.cartProducts);

        return this.cartProductsObs;
    }

    addProductToCart(product: ProductInOrder): void {
        const index = this.cartProducts.findIndex((x) => x.id === product.id && x.productSize === product.productSize);
        if (index !== -1) {
            this.cartProducts[index].count += product.count;
        } else {
            this.cartProducts.push(product);
        }
        this.cookieService.set('cart', JSON.stringify(this.cartProducts), undefined, '/', undefined, false, 'Lax');
        this.cartProductsSubject.next(this.cartProducts);
        this.toastrService.success('Successfully added item to cart.');
    }

    removeProductFromCart(product: ProductInOrder): void {
        const index = this.cartProducts.findIndex((x) => x.id === product.id && x.productSize === product.productSize);
        if (index !== -1) {
            this.cartProducts.splice(index, 1);
            this.cookieService.set('cart', JSON.stringify(this.cartProducts), undefined, '/', undefined, false, 'Lax');
            this.cartProductsSubject.next(this.cartProducts);
            this.toastrService.info('Item removed from cart');
        } else {
            console.log('Failed to remove item from cart.');
        }
    }

    clearCart(): void {
        this.cartProducts = [];
        this.cartProductsSubject.next(this.cartProducts);
        this.cookieService.set('cart', JSON.stringify(this.cartProducts), undefined, '/', undefined, false, 'Lax');
    }

    checkout(order: OrderDto): Promise<any> {
        return Promise.resolve(true);
    }
}
