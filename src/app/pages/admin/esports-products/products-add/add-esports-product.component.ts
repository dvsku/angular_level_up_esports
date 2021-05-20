import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductInfoSize } from 'src/app/models/ProductInfoSize';
import { Subscription } from 'rxjs';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImagesHandler } from 'src/app/models/interfaces/ImagesHandler';
import { ModelWithImage } from 'src/app/models/base/ModelWithImage';
import { ImageGroupComponent } from 'src/app/parts/common/image-group/image-group.component';
import { ProductIcon } from 'src/app/models/ProductIcon';
import { faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-add-esports-product',
    templateUrl: './add-esports-product.component.html',
    styleUrls: ['./add-esports-product.component.sass']
})
export class AddEsportsProductComponent implements OnInit, OnDestroy, AfterViewInit, ImagesHandler {
    product: ProductInfo = new ProductInfo();
    categories: ProductCategory[];

    @ViewChild(ImageGroupComponent)
    imageGroup: ImageGroupComponent;

    size = '';
    title = 'Add Esports Product';

    faSave = faSave;
    faPlus = faPlus;
    faTimes = faTimes;

    private categoriesSubscription: Subscription;

    constructor(
        private config: NgbNavConfig,
        private categoriesService: ProductCategoryService,
        private productService: ProductService,
        private router: Router,
        private toastrService: ToastrService
    ) {
        config.destroyOnHide = false;
    }

    ngOnInit(): void {
        this.categoriesSubscription = this.categoriesService.getProductCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }

    ngOnDestroy(): void {
        this.categoriesSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.imageGroup.parent = this;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //	ImagesHandler interface
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    createImage(image: string) {
        this.product.productInfoIcons.push(new ProductIcon(null, image, 0));
    }

    removeImage(image: ModelWithImage) {
        const index = this.product.productInfoIcons.findIndex((x) => x.image === image.image);
        if (index !== -1) {
            this.product.productInfoIcons.splice(index, 1);
        }
    }

    reorderImages() {
        this.product.productInfoIcons.forEach((image, index) => {
            image.displayOrder = index + 1;
        });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //	SIZES
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onAddSizeSubmit(): void {
        if (this.size !== '' && this.product.productInfoSizes.findIndex((x) => x.productSize === this.size) === -1) {
            this.product.productInfoSizes.push(new ProductInfoSize(null, this.size));
            this.reorderSizes();
            this.size = '';
        }
    }

    removeSize(size: ProductInfoSize): void {
        const index = this.product.productInfoSizes.findIndex((x) => x.productSize === size.productSize);
        if (index !== -1) {
            this.product.productInfoSizes.splice(index, 1);
            this.reorderSizes();
        }
    }

    reorderSizes(): void {
        this.product.productInfoSizes.forEach((size, index) => {
            size.sizeOrder = index + 1;
        });
    }

    drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.product.productInfoSizes, event.previousIndex, event.currentIndex);
        this.reorderSizes();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //	IMAGES
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    addImageInput(): void {
        this.imageGroup.addImage();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //	FORM
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onSubmit(): void {
        this.productService.createProduct(this.product).then((success) => {
            if (success) {
                this.router
                    .navigate(['/admin/dashboard', { outlets: { adminOutlet: 'esports/products' } }], {
                        skipLocationChange: true
                    })
                    .then(() => {
                        this.toastrService.success('Product created.');
                    });
            } else {
                this.toastrService.error("Couldn't create product.");
            }
        });
    }
}
