import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  	count: number = 1;
  	product: ProductInfo;

  	constructor(private productService: ProductService, private cartService: CartService, private activeRoute : ActivatedRoute) { }

  	ngOnInit(): void {
    	const id = +this.activeRoute.snapshot.paramMap.get('id');
    	this.productService.getProductDetail(id).subscribe(prod => {
      		this.product = prod;
    	})
  	}

  	addToCart() {
		this.cartService.addProductToCart(new ProductInOrder(this.product, this.count, "M"));
  	}
}