import { Component, Input } from '@angular/core';
import { ProductInfo } from 'src/app/models/ProductInfo';

@Component({
    selector: 'app-shop-item-deck',
    templateUrl: './shop-item-deck.component.html',
    styleUrls: ['./shop-item-deck.component.sass']
})
export class ShopItemDeckComponent {
    @Input('products')
    products: ProductInfo[];
}
