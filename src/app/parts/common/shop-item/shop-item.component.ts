import { Component, Input } from '@angular/core';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ImagesService } from 'src/app/services/images.service';

@Component({
    selector: 'app-shop-item',
    templateUrl: './shop-item.component.html',
    styleUrls: ['./shop-item.component.sass']
})
export class ShopItemComponent {
    @Input('product')
    product: ProductInfo;

    constructor(public imagesService: ImagesService) {}

    getProductSizes(): string {
        if (this.product === null || this.product === undefined) return '';
        let final = '';
        this.product.productInfoSizes.forEach((size, index) => {
            if (index === this.product.productInfoSizes.length - 1) {
                final = final.concat(size.productSize);
            } else {
                final = final.concat(size.productSize + ', ');
            }
        });
        return final;
    }
}
