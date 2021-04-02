import { Component, OnInit } from '@angular/core';
import { ProductInfo } from 'src/app/models/ProductInfo';
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

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productService.getAllSortedProducts("new").subscribe(prods => {
      this.products = prods;
      console.log(this.products)
    })
  }

}
