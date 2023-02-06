import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductIcon } from 'src/app/models/ProductIcon';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductInfoSize } from 'src/app/models/ProductInfoSize';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ImagesService } from 'src/app/services/images.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
    faPlus = faPlus;
    faMinus = faMinus;
    count = 1;
    product: ProductInfo;
    imageSource: ProductIcon;
    selectedSize: ProductInfoSize;
    addToCartDisabled = true;

    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private activeRoute: ActivatedRoute,
        private router: Router,
        public imagesService: ImagesService
    ) {}

    ngOnInit(): void {
        this.activeRoute.data.subscribe((data: { product: ProductInfo }) => {
            if (data.product === undefined || data.product === null) {
                this.router.navigate(['/esports']);
                return;
            } else {
                this.product = data.product;
                this.imageSource = this.product.productInfoIcons[0];
                this.validateAddToCart();
            }
        });
    }

    onHover(image: ProductIcon) {
        this.imageSource = image;
    }

    changeSize(size: ProductInfoSize) {
        if (this.selectedSize !== size) {
            this.selectedSize = size;
            this.validateAddToCart();
        }
    }

    validateAddToCart(): void {
        if (this.product === null || this.product === undefined) {
            this.addToCartDisabled = true;
            return;
        }
        if (this.product.productInfoSizes.length > 0) {
            this.addToCartDisabled = this.selectedSize === null || this.selectedSize === undefined;
            return;
        }
        this.addToCartDisabled = false;
    }

    increaseCount(): void {
        this.count++;
    }

    decreaseCount(): void {
        if (this.count !== 1) {
            this.count--;
        }
    }

    addToCart(): void {
        if (this.product.productInfoSizes.length === 0) {
            this.cartService.addProductToCart(new ProductInOrder(null, this.product, this.count, ''));
        } else {
            this.cartService.addProductToCart(
                new ProductInOrder(null, this.product, this.count, this.selectedSize.productSize)
            );
        }
    }
}
