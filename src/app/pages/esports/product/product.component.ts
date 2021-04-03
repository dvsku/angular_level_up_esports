import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { CartService } from 'src/app/services/cart.service';
import { ProductStorageService } from 'src/app/services-cache/product-storage.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  	count: number = 1;
  	product: ProductInfo;

  	constructor(private productService: ProductService, private productStorage: ProductStorageService, 
		private cartService: CartService, private activeRoute : ActivatedRoute) { }

  	ngOnInit(): void {
    	const id = +this.activeRoute.snapshot.paramMap.get('id');
    	this.getProduct(id);
  	}

	getProduct(productId: number) {
		var product: ProductInfo = this.productStorage.tryGetProduct(productId);
		if(product === undefined) {
			this.productService.getProductDetail(productId).subscribe(prod => {
				product = prod;
				console.log("Fetched from backend detail")
			})
		}
		this.product = product;
	}

  	addToCart() {
		this.cartService.addProductToCart(new ProductInOrder(this.product, this.count, "M"));
  	}
}