import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ImagesFormGroupComponent } from 'src/app/parts/common/images-form-group/images-form-group.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductInfoSize } from 'src/app/models/ProductInfoSize';
import { Subscription } from 'rxjs';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-add-esports-product',
    templateUrl: './add-esports-product.component.html',
    styleUrls: ['./add-esports-product.component.sass']
})
export class AddEsportsProductComponent implements OnInit, OnDestroy {
    product: ProductInfo = new ProductInfo();
    categories: ProductCategory[];

    @ViewChild(ImagesFormGroupComponent)
    imagesFormGroup: ImagesFormGroupComponent;

    size = '';
    title = 'Add Esports Product';

    private categoriesSubscription: Subscription;

    constructor(
        private config: NgbNavConfig,
        private modalService: NgbModal,
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
        this.imagesFormGroup.addImage();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //	MODAL
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    openModal(modal: any): void {
        this.modalService.open(modal, {
            ariaLabelledBy: 'modal-basic-title',
            backdrop: 'static'
        });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //	FORM
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onSubmit(): void {
        this.productService
            .createProduct(this.product)
            .subscribe((success) => {
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
            })
            .unsubscribe();
    }
}
