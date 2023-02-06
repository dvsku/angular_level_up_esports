import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'cart-product-group',
    templateUrl: './cart-product-group.component.html',
    styleUrls: ['./cart-product-group.component.sass']
})
export class CartProductGroupComponent implements OnInit, OnDestroy {
    @Input('products')
    products: ProductInOrder[];

    @Input('removable')
    public removable = true;

    @Input('showTotal')
    public showTotal = true;

    private productsSubscription: Subscription;

    total: number;
    totalEuro: number;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.productsSubscription = this.cartService.getCart().subscribe((prods) => {
            this.products = prods;
            this.total = this.products.reduce((sum, current) => sum + current.count * current.product.productPrice, 0);
            this.totalEuro = this.products.reduce(
                (sum, current) => sum + current.count * current.product.priceInEuros,
                0
            );
        });
    }

    ngOnDestroy(): void {
        this.productsSubscription.unsubscribe();
    }
}
