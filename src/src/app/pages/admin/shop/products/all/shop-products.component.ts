import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductStatus } from 'src/app/enums/ProductStatus';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductService } from 'src/app/services/product.service';
import { faAngleDown, faEdit, faInfo, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { Subscription } from 'rxjs';
import { ImagesService } from 'src/app/services/images.service';

@Component({
    selector: 'app-shop-products',
    templateUrl: './shop-products.component.html',
    styleUrls: ['./shop-products.component.sass']
})
export class ShopProductsComponent implements OnInit, OnDestroy {
    public isFiltersCollapsed = true;

    products: ProductInfo[];
    displayedProducts: ProductInfo[];
    selectedProduct: ProductInfo;
    categories: ProductCategory[];
    selectedCategory = -1;
    sort = 'newest';

    faArrowDown = faAngleDown;
    faInfo = faInfo;
    faPlus = faPlus;
    faEdit = faEdit;
    faTimes = faTimes;

    private productsSubscription: Subscription;
    private categoriesSubscription: Subscription;

    constructor(
        private productService: ProductService,
        private categoriesService: ProductCategoryService,
        public imagesService: ImagesService
    ) {}

    ngOnInit(): void {
        this.getProducts();
        this.getCategories();
    }

    ngOnDestroy(): void {
        this.productsSubscription.unsubscribe();
        this.categoriesSubscription.unsubscribe();
    }

    onRemoveOk(): void {
        if (this.selectedProduct !== undefined) {
            this.deleteProduct(this.selectedProduct);
        }
    }

    getProducts(): void {
        this.productsSubscription = this.productService.getProducts().subscribe((prods) => {
            this.products = prods;
            this.displayedProducts = this.products.filter((x) => x.productStatus === ProductStatus.Available);
        });
    }

    getCategories(): void {
        this.categoriesSubscription = this.categoriesService.getProductCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }

    updateProducts(): void {
        if (this.products === null || this.products === undefined) return;
        let products: ProductInfo[] = this.products.filter((x) => x);
        switch (this.sort) {
            case 'newest':
                products = products.sort((a, b) => {
                    return new Date(a.createTime).getTime() - new Date(b.createTime).getTime();
                });
                break;
            case 'priceAsc':
                products = products.sort((a, b) => 0 - (a.productPrice > b.productPrice ? -1 : 1));
                break;
            case 'priceDesc':
                products = products.sort((a, b) => 0 - (a.productPrice > b.productPrice ? 1 : -1));
                break;
            case 'popular':
                products = products.sort((a, b) => 0 - (a.sold > b.sold ? 1 : -1));
                break;
        }

        if (this.selectedCategory === -1) {
            products = products.filter((x) => x);
        } else {
            products = products.filter((x) => x.categoryType === this.selectedCategory);
        }

        this.displayedProducts = products;
    }

    changeCategory(category: any): void {
        this.selectedCategory = +category;
        this.updateProducts();
    }

    changeSort(sort: string): void {
        this.sort = sort;
        this.updateProducts();
    }

    deleteProduct(product: ProductInfo): void {
        this.productService.removeProduct(product);
    }
}
