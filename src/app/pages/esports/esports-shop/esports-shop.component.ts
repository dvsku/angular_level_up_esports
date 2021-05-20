import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductStatus } from 'src/app/enums/ProductStatus';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { CompareService } from 'src/app/services/compare.service';

@Component({
    selector: 'app-esports-shop',
    templateUrl: './esports-shop.component.html',
    styleUrls: ['./esports-shop.component.sass']
})
export class EsportsShopComponent implements OnInit, OnDestroy {
    public isTopsCollapsed = true;
    public isBottomsCollapsed = true;

    products: ProductInfo[];
    displayedProducts: ProductInfo[];
    categories: ProductCategory[];

    category: string;
    sort: string;

    private productsSubscription: Subscription;
    private categoriesSubscription: Subscription;

    constructor(
        private productService: ProductService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private productCategoryService: ProductCategoryService,
        private compareService: CompareService
    ) {}

    ngOnInit(): void {
        this.categoriesSubscription = this.productCategoryService.getProductCategories().subscribe((cats) => {
            this.categories = cats;
        });

        this.productsSubscription = this.productService.getProducts().subscribe((prods) => {
            if (prods !== null && prods !== undefined) {
                this.products = prods.filter((x) => x.productStatus === ProductStatus.Available);
                this.displayedProducts = this.products;

                this.getRouteParameters();
                this.setRouteParameters();
                this.updateShop();
            }
        });
    }

    ngOnDestroy(): void {
        if (this.productsSubscription) this.productsSubscription.unsubscribe();
        if (this.categoriesSubscription) this.categoriesSubscription.unsubscribe();
    }

    changeCategory(category: string): void {
        this.category = category;
        this.setRouteParameters();
        this.updateShop();
    }

    changeSort(sort: string): void {
        this.sort = sort;
        this.setRouteParameters();
        this.updateShop();
    }

    updateShop(): void {
        if (this.products === null || this.products === undefined) return;
        let products: ProductInfo[] = this.products.filter((x) => x);
        switch (this.sort) {
            case 'newest':
                products = products.sort((a, b) => this.compareService.compareISODatesDESC(a.createTime, b.createTime));
                break;
            case 'priceAsc':
                products = products.sort((a, b) =>
                    this.compareService.compareNumbersASC(a.productPrice, b.productPrice)
                );
                break;
            case 'priceDesc':
                products = products.sort((a, b) =>
                    this.compareService.compareNumbersDESC(a.productPrice, b.productPrice)
                );
                break;
            case 'popular':
                products = products.sort((a, b) => this.compareService.compareNumbersDESC(a.sold, b.sold));
                break;
        }
        if (this.category === 'all') {
            products = products.filter((x) => x);
        } else {
            for (const category of this.categories) {
                if (this.category === category.categoryName.toLowerCase()) {
                    products = products.filter((x) => x.categoryType === category.categoryType);
                    break;
                }
            }
        }
        this.displayedProducts = products;
    }

    setRouteParameters(): void {
        const url = this.router
            .createUrlTree(['esports/shop', { sort: this.sort, category: this.category }])
            .toString();
        this.location.replaceState(url);
    }

    getRouteParameters(): void {
        this.activatedRoute.paramMap.subscribe((parameters) => {
            if (parameters.has('category')) {
                this.category = parameters.get('category');
            } else {
                this.category = 'all';
            }
            if (parameters.has('sort')) {
                this.sort = parameters.get('sort');
            } else {
                this.sort = 'newest';
            }
        });
    }
}
