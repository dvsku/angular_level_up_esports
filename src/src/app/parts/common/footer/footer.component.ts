import { Component, OnDestroy, OnInit } from '@angular/core';
import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit, OnDestroy {
    faInstagram = faInstagram;
    faFacebook = faFacebookSquare;

    categories: ProductCategory[];
    private categoriesSubscription: Subscription;

    constructor(private categoriesService: ProductCategoryService) {}

    ngOnInit(): void {
        this.categoriesSubscription = this.categoriesService.getProductCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }

    ngOnDestroy(): void {
        this.categoriesSubscription.unsubscribe();
    }
}
