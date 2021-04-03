import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { ProductInfo } from '../models/ProductInfo';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductStorageService {
	private productsSubject: BehaviorSubject<ProductInfo[]> = new BehaviorSubject<ProductInfo[]>(null);
	private products = this.productsSubject.asObservable()

  	constructor(private productService: ProductService) { }

	getProducts() : Observable<ProductInfo[]> {
		if(this.productsSubject.getValue() === null) {
			var obsProds = this.productService.getAllSortedProducts("new")
			var prods: ProductInfo[]

			obsProds.subscribe(products => {
				prods = products;
			})

			this.productsSubject.next(prods);
			this.products = obsProds.pipe(
				publishReplay(1),
				refCount()
			)
			console.log("Fetched from backed")
		}
		return this.products;
	}

	removeProduct(product: ProductInfo) {
		var products: ProductInfo[]
		if(this.products) {
			this.products.subscribe(prods => {
				products = prods
			});
			if(products !== null && products !== undefined) {
				const index = products.indexOf(product);
				if(index !== -1) {
					products.splice(index, 1);
					this.productsSubject.next(products);
					console.log("Removed product from cache")
				}
			}
		}
	}

	tryGetProduct(productId: number) : ProductInfo {
		var product = undefined;
		if(this.products) {
			this.products.subscribe(prods => {
				if(prods !== null && prods !== undefined) {
					product = prods.find(x => x.productId === productId);
				}
			})
		}
		return product;
	}

	getFeaturedProducts(count: number) : ProductInfo[] {
		var products: ProductInfo[];
		if(this.products) {
			this.products.subscribe(prods => {
				console.log(prods)
				if(prods !== null && prods !== undefined) {
					products = prods.sort((a, b) => a.sold - b.sold).slice(0, count);
				}
				else {
					this.getProducts().subscribe(prods => {
						console.log(prods)
						if(prods !== null && prods !== undefined) {
							products = prods.sort((a, b) => a.sold - b.sold).slice(0, count);
						}
					})
				}
			})
		}
		return products;
	}

	clear() {
		this.products = null;
	}
}
