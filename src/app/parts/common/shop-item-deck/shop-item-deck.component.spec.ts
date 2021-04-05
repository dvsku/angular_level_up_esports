import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopItemDeckComponent } from './shop-item-deck.component';

describe('ShopItemDeckComponent', () => {
    let component: ShopItemDeckComponent;
    let fixture: ComponentFixture<ShopItemDeckComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShopItemDeckComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopItemDeckComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
