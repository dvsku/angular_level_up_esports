import { Component, OnInit, Input } from '@angular/core';
import { ProductInfo } from 'src/app/models/ProductInfo';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.sass']
})
export class ShopItemComponent implements OnInit {
  @Input("product")
  product: ProductInfo

	constructor() { }
	ngOnInit(): void {}
}
