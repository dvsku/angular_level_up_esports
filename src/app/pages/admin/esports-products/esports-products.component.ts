import { Component, OnInit } from '@angular/core';
import { ProductStatus } from 'src/app/enums/ProductStatus';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductService } from 'src/app/services/product.service';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductStorageService } from 'src/app/services-cache/product-storage.service';

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
	faArrowDown = faAngleDown

	constructor(private productService: ProductService, private productStorage: ProductStorageService, private modalService: NgbModal, config: NgbModalConfig) { 
		config.backdrop = 'static';
		config.keyboard = false;
	}

	ngOnInit(): void {
		this.getProducts();
	}

	showModal(content: any) {
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
	}

	onRemoveOk() {
		if(this.selectedProduct !== undefined){
			this.deleteProduct(this.selectedProduct);
    	}
	}

	getProducts() {
		this.productStorage.getProducts().subscribe(prods => {
			this.products = prods;
			this.displayedProducts = this.products.filter(x => x.productStatus === ProductStatus.Available);
		})
	}

	deleteProduct(product : ProductInfo) {
		const index = this.products.indexOf(product);
		if(index != -1) {
			this.productService.deleteProduct(product).subscribe(data => {
				/* this.allProducts.splice(index, 1);	
				const displayIndex = this.displayedProducts.indexOf(product);
				if(displayIndex != -1) {
					this.displayedProducts.splice(displayIndex, 1);
				} */
				this.productStorage.removeProduct(product)
				//this.getPageProducts(this.pageNum, this.sizeNum)
				//this.toastrService.success('Successfully deleted product from the list');
			},
			error => {
				//this.toastrService.error('Error while deleting product from list of products');
			});
		}
  	}
}
