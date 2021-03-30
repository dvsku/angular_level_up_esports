import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-esports-shop',
  templateUrl: './esports-shop.component.html',
  styleUrls: ['./esports-shop.component.sass']
})
export class EsportsShopComponent implements OnInit {
  public isTopsCollapsed: boolean = true;
  public isBottomsCollapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
