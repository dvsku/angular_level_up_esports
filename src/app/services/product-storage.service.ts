import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { ProductInfo } from '../models/ProductInfo';
import { ProductService } from './product.service';

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

			/* this.products = this.productService.getAllSortedProducts("new").pipe(
				
				map(prod => prod),
				publishReplay(1),
				refCount(),
			) */
			console.log("Fetched from backed")
		}
		return this.products;
	}

	tryGetProduct(productId: number) : ProductInfo {
		var product = undefined;
		if(this.products) {
			this.products.subscribe(prods => {
				product = prods.find(x => x.productId === productId);
			})
		}
		return product;
	}

	clear() {
		this.products = null;
	}
}
