import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsportsProductsComponent } from './esports-products.component';

describe('EsportsProductsComponent', () => {
    let component: EsportsProductsComponent;
    let fixture: ComponentFixture<EsportsProductsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EsportsProductsComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EsportsProductsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
