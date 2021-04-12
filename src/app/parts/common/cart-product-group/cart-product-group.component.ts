import { Component, OnInit, Input } from '@angular/core';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'cart-product-group',
    templateUrl: './cart-product-group.component.html',
    styleUrls: ['./cart-product-group.component.sass']
})
export class CartProductGroupComponent implements OnInit {
    @Input('products')
    products: ProductInOrder[];

    total: number;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.products = this.cartService.getCart();
        this.total = this.products.reduce((sum, current) => sum + current.count * current.productPrice, 0);
    }
}
