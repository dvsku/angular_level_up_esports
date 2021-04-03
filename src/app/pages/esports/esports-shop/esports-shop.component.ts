import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductStatus } from 'src/app/enums/ProductStatus';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductStorageService } from 'src/app/services-cache/product-storage.service';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductCategory } from 'src/app/models/ProductCategory';

@Component({
  selector: 'app-esports-shop',
  templateUrl: './esports-shop.component.html',
  styleUrls: ['./esports-shop.component.sass']
})
export class EsportsShopComponent implements OnInit {
  	public isTopsCollapsed: boolean = true;
  	public isBottomsCollapsed: boolean = true;

  	products: ProductInfo[];
  	displayedProducts: ProductInfo[];
	categories: ProductCategory[];

	category: string;
	sort: string;

  	constructor(private productStorage: ProductStorageService, private router: Router, 
		private activatedRoute: ActivatedRoute, private location: Location, private productCategoryService: ProductCategoryService) { }

	changeCategory(category: string) {
		this.category = category;
		this.setRouteParameters();
		this.updateShop();
	}

	changeSort(sort: string) {
		this.sort = sort;
		this.setRouteParameters();
		this.updateShop();
	}

	updateShop() {
		if(this.products === null || this.products === undefined) return;
		console.log('a');
		var products: ProductInfo[] = this.products.filter(x => x);
		switch(this.sort) {
			case 'newest':
				products = products.sort((a, b) => {
					return new Date(a.createTime).getTime() - new Date(b.createTime).getTime()
				})
				break;
			case 'priceAsc':
				products = products.sort((a,b) => 0 - (a.productPrice > b.productPrice ? -1 : 1));
				break;
			case 'priceDesc':
				products = products.sort((a,b) => 0 - (a.productPrice > b.productPrice ? 1 : -1));
				break;
			case 'popular':
				products = products.sort((a,b) => a.sold - b.sold);
				break;
		}
		if(this.category === 'all') {
			products = products.filter(x => x);
		}
		else {
			for(var category of this.categories) {
				if(this.category === category.categoryName.toLowerCase()) {
					products = products.filter(x => x.categoryType === category.categoryType);
					break;
				}
			}
		}
		this.displayedProducts = products;
	}

	setRouteParameters() {
		let url = this.router.createUrlTree(['esports/shop', { sort: this.sort, category: this.category }]).toString();
		this.location.replaceState(url);
	}

	getRouteParameters() {
		this.activatedRoute.paramMap.subscribe(parameters => {
			if(parameters.has('category')) {
				this.category = parameters.get('category');
			}
			else {
				this.category = 'all';
			}
			if(parameters.has('sort')) {
				this.sort = parameters.get('sort');
			}
			else {
				this.sort = 'newest';
			}
		})
	}

	ngOnInit(): void {
		this.productCategoryService.getProductCategories().subscribe(cats => {
			this.categories = cats;
		});

		this.productStorage.getProducts().subscribe(prods => {
			this.products = prods.filter(x => x.productStatus === ProductStatus.Available);
			this.displayedProducts = this.products

			this.getRouteParameters();
			this.setRouteParameters();
			this.updateShop();
		});
	}
}
