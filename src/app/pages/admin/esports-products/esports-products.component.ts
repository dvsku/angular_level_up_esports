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
	allProducts: ProductInfo[];
	displayedProducts: ProductInfo[];
	selectedProduct: ProductInfo;
	ProductStatus = ProductStatus;
	faArrowDown = faAngleDown

	constructor(private productService: ProductService, private modalService: NgbModal, config: NgbModalConfig) { 
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
		this.productService.getAllSortedProducts("new").subscribe(data => {
			this.allProducts = data
			this.displayedProducts = this.allProducts;
			//console.log(this.displayedProducts)
		})
	}

	deleteProduct(product : ProductInfo) {
		const index = this.allProducts.indexOf(product);
		if(index != -1) {
			this.productService.deleteProduct(product).subscribe(data => {
				this.allProducts.splice(index, 1);	
				const displayIndex = this.displayedProducts.indexOf(product);
				if(displayIndex != -1) {
					this.displayedProducts.splice(displayIndex, 1);
				}
				//this.getPageProducts(this.pageNum, this.sizeNum)
				//this.toastrService.success('Successfully deleted product from the list');
			},
			error => {
				//this.toastrService.error('Error while deleting product from list of products');
			});
		}
  	}
}
