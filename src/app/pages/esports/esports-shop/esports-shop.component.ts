import { Component, OnInit } from '@angular/core';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductStorageService } from 'src/app/services/product-storage.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-esports-shop',
  templateUrl: './esports-shop.component.html',
  styleUrls: ['./esports-shop.component.sass']
})
export class EsportsShopComponent implements OnInit {
  public isTopsCollapsed: boolean = true;
  public isBottomsCollapsed: boolean = true;

  products: ProductInfo[];

  constructor(private productStorage: ProductStorageService) { }

	ngOnInit(): void {
		this.productStorage.getProducts().subscribe(prods => {
			this.products = prods;
		})
	}
}
