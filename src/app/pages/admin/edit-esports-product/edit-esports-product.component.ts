import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgbModal, NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductInfoSize } from 'src/app/models/ProductInfoSize';
import { Subscription } from 'rxjs';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { ImagesHandler } from 'src/app/models/interfaces/ImagesHandler';
import { ImageGroupComponent } from 'src/app/parts/common/image-group/image-group.component';
import { ModelWithImage } from 'src/app/models/base/ModelWithImage';
import { ProductIcon } from 'src/app/models/ProductIcon';

@Component({
    selector: 'app-edit-esports-product',
    templateUrl: '../add-esports-product/add-esports-product.component.html',
    styleUrls: ['../add-esports-product/add-esports-product.component.sass']
})
export class EditEsportsProductComponent implements OnInit, OnDestroy, AfterViewInit, ImagesHandler {
    product: ProductInfo = new ProductInfo();
    productId: number;
    categories: ProductCategory[];
    size = '';
    title = 'Edit Esports Product';

    @ViewChild(ImageGroupComponent)
    imageGroup: ImageGroupComponent;

    private categoriesSubscription: Subscription;

    constructor(
        private config: NgbNavConfig,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private productService: ProductService,
        private modalService: NgbModal,
        private categoriesService: ProductCategoryService
    ) {
        config.destroyOnHide = false;
    }

    ngOnInit(): void {
        this.productId = +this.activatedRoute.snapshot.paramMap.get('id');
        if (this.productId) {
            this.productService.getProduct(this.productId).then((prod) => {
                this.product = prod;
            });
        }
        this.categoriesSubscription = this.categoriesService.getProductCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }

    ngOnDestroy(): void {
        if (this.categoriesSubscription !== null && this.categoriesSubscription !== undefined) {
            this.categoriesSubscription.unsubscribe();
        }
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
        console.log(this.product.productInfoIcons);
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
            .updateProduct(this.product)
            .pipe(take(1))
            .subscribe((success) => {
                if (success) {
                    this.router
                        .navigate(['/admin/dashboard', { outlets: { adminOutlet: 'esports/products' } }], {
                            skipLocationChange: true
                        })
                        .then(() => {
                            this.toastrService.success('Product updated.');
                        });
                } else {
                    console.log('fail');
                    this.toastrService.error("Couldn't update product.");
                }
            });
    }
}
