import { Component, OnInit } from '@angular/core';
import { ProductStatus } from 'src/app/enums/ProductStatus';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductService } from 'src/app/services/product.service';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-esports-products',
    templateUrl: './esports-products.component.html',
    styleUrls: ['./esports-products.component.sass']
})
export class EsportsProductsComponent implements OnInit {
    products: ProductInfo[];
    displayedProducts: ProductInfo[];
    selectedProduct: ProductInfo;
    ProductStatus = ProductStatus;
    faArrowDown = faAngleDown;

    constructor(
        private productService: ProductService,
        private modalService: NgbModal,
        config: NgbModalConfig
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit(): void {
        this.getProducts();
    }

    showModal(content: any): void {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    onRemoveOk(): void {
        if (this.selectedProduct !== undefined) {
            this.deleteProduct(this.selectedProduct);
        }
    }

    getProducts(): void {
        this.productService.getProducts().subscribe((prods) => {
            this.products = prods;
            this.displayedProducts = this.products.filter(
                (x) => x.productStatus === ProductStatus.Available
            );
        });
    }

    deleteProduct(product: ProductInfo): void {
        this.productService.removeProduct(product);
    }
}
