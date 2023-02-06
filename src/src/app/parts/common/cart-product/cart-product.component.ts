import { Component, Input } from '@angular/core';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { CartService } from 'src/app/services/cart.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'cart-product',
    templateUrl: './cart-product.component.html',
    styleUrls: ['./cart-product.component.sass']
})
export class CartProductComponent {
    faRemove = faTimes;

    @Input('product')
    product: ProductInOrder;

    @Input('removable')
    public removable = true;

    constructor(private cartService: CartService) {}

    removeProduct() {
        this.cartService.removeProductFromCart(this.product);
    }
}
