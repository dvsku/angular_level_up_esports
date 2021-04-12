import { Component, OnInit, Input } from '@angular/core';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { CartService } from 'src/app/services/cart.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'cart-product',
    templateUrl: './cart-product.component.html',
    styleUrls: ['./cart-product.component.sass']
})
export class CartProductComponent implements OnInit {
    faRemove = faTimes;

    @Input('product')
    product: ProductInOrder;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        console.log(this.product);
    }
}
